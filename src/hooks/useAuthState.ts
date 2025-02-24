
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
    const publicPaths = ['/login', '/employer-landing', '/educator-landing', '/participant-landing', '/', '/registration'];
    return publicPaths.includes(path) || path.startsWith('/registration/');
  }, []);

  const enforceRoleAccess = useCallback((currentPath: string, userRole: UserRole) => {
    const pathRole = currentPath.split('/')[1] as UserRole;
    
    // Store the last known valid role
    if (userRole) {
      lastKnownRole.current = userRole;
    }
    
    if (pathRole && ['admin', 'educator', 'employer', 'participant'].includes(pathRole)) {
      if (pathRole !== userRole) {
        console.log(`Role mismatch - Path role: ${pathRole}, User role: ${userRole}`);
        const redirectPath = getRoleBasedRedirect(userRole);
        navigate(redirectPath, { replace: true });
        return false;
      }
    }
    return true;
  }, [navigate, getRoleBasedRedirect]);

  const handleSession = useCallback(async (session: any | null) => {
    if (!mounted.current || processingAuth.current) return;
    
    try {
      processingAuth.current = true;
      
      // If no session, clear user state and redirect if needed
      if (!session?.user) {
        setUser(null);
        lastKnownRole.current = null; // Clear the last known role
        setIsLoading(false);
        authCheckComplete.current = true;
        
        // Only redirect to login if we're on a protected route
        if (!isPublicRoute(location.pathname) && location.pathname !== '/login') {
          navigate('/login', { replace: true });
        }
        return;
      }

      // Get user profile
      const profile = await getUserProfile(session);
      
      if (!mounted.current) return;

      if (!profile) {
        setUser(null);
        lastKnownRole.current = null;
        setIsLoading(false);
        authCheckComplete.current = true;
        
        if (!isPublicRoute(location.pathname)) {
          navigate('/login', { replace: true });
        }
        return;
      }

      // Set user profile
      setUser(profile);
      lastKnownRole.current = profile.role;
      setIsLoading(false);
      authCheckComplete.current = true;

      // Enforce role-based access
      if (!isPublicRoute(location.pathname)) {
        enforceRoleAccess(location.pathname, profile.role);
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

        // Subscribe to auth changes
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
