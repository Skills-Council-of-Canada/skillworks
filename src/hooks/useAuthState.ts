
import { useState, useEffect, useCallback, useRef } from "react";
import { User, UserRole } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserProfile } from "@/services/auth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { getRoleBasedRedirect } = useAuthRedirect();
  const authCheckComplete = useRef(false);
  const mounted = useRef(true);
  const processingAuth = useRef(false);
  const lastKnownRole = useRef<UserRole | null>(null);

  const isPublicRoute = useCallback((path: string) => {
    const publicPaths = [
      '/login', 
      '/employer-landing', 
      '/educator-landing', 
      '/participant-landing', 
      '/', 
      '/home',
      '/career-pathways',
      '/registration',
      '/index'
    ];
    return publicPaths.includes(path) || path.startsWith('/registration/') || path.includes('career-pathways');
  }, []);

  const enforceRoleAccess = useCallback((currentPath: string, userRole: UserRole) => {
    const pathRole = currentPath.split('/')[1] as UserRole;
    
    if (userRole) {
      lastKnownRole.current = userRole;
    }
    
    // Don't enforce role access on public routes
    if (isPublicRoute(currentPath)) {
      return true;
    }
    
    if (pathRole && ['admin', 'educator', 'employer', 'participant'].includes(pathRole)) {
      if (pathRole !== userRole) {
        console.log(`Role mismatch - Path role: ${pathRole}, User role: ${userRole}`);
        navigate(`/${userRole}/dashboard`, { replace: true });
        return false;
      }
    }
    return true;
  }, [navigate, isPublicRoute]);

  const handleSession = useCallback(async (session: any | null) => {
    if (!mounted.current || processingAuth.current) return;
    
    try {
      processingAuth.current = true;
      
      // If no session and on public route, just clear user state
      if (!session?.user && isPublicRoute(location.pathname)) {
        setUser(null);
        lastKnownRole.current = null;
        setIsLoading(false);
        authCheckComplete.current = true;
        return;
      }

      // If no session and on protected route, redirect to login
      if (!session?.user && !isPublicRoute(location.pathname)) {
        setUser(null);
        lastKnownRole.current = null;
        setIsLoading(false);
        authCheckComplete.current = true;
        navigate('/login');
        return;
      }

      // Get user profile if we have a session
      if (session?.user) {
        const profile = await getUserProfile(session);
        
        if (!mounted.current) return;

        if (!profile) {
          setUser(null);
          lastKnownRole.current = null;
          setIsLoading(false);
          authCheckComplete.current = true;
          
          if (!isPublicRoute(location.pathname)) {
            navigate('/login');
          }
          return;
        }

        // Set user profile
        setUser(profile);
        lastKnownRole.current = profile.role;
        setIsLoading(false);
        authCheckComplete.current = true;

        // Only enforce role access for non-public routes
        if (!isPublicRoute(location.pathname)) {
          enforceRoleAccess(location.pathname, profile.role);
        }
      }

    } catch (error) {
      console.error("Profile error:", error);
      if (mounted.current) {
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive",
        });
        setUser(null);
        lastKnownRole.current = null;
        setIsLoading(false);
        authCheckComplete.current = true;
      }
    } finally {
      processingAuth.current = false;
    }
  }, [navigate, location.pathname, isPublicRoute, enforceRoleAccess, toast]);

  useEffect(() => {
    mounted.current = true;
    
    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted.current) {
          await handleSession(session);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted.current) return;

          console.log("Auth state change:", event);

          if (event === 'SIGNED_OUT') {
            setUser(null);
            lastKnownRole.current = null;
            setIsLoading(false);
            navigate('/', { replace: true });
            return;
          }

          if (session && ['SIGNED_IN', 'TOKEN_REFRESHED'].includes(event)) {
            await handleSession(session);
          }
        });

        return () => {
          subscription.unsubscribe();
        };

      } catch (error) {
        console.error("Auth setup error:", error);
        if (mounted.current) {
          setUser(null);
          lastKnownRole.current = null;
          setIsLoading(false);
          toast({
            title: "Authentication Error",
            description: "There was a problem with the authentication service",
            variant: "destructive",
          });
        }
      }
    };

    setupAuth();

    return () => {
      mounted.current = false;
    };
  }, [handleSession, navigate, toast]);

  return { user, setUser, isLoading, setIsLoading };
};
