
import { useState, useEffect, useCallback, useRef } from "react";
import { User } from "@/types/auth";
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

  const isPublicRoute = useCallback((path: string) => {
    const publicPaths = ['/login', '/employer-landing', '/educator-landing', '/participant-landing', '/', '/registration'];
    return publicPaths.includes(path) || path.startsWith('/registration/');
  }, []);

  const handleSession = useCallback(async (session: any | null) => {
    if (!mounted.current) return;
    
    try {
      // If no session, clear user state and redirect if needed
      if (!session?.user) {
        setUser(null);
        setIsLoading(false);
        authCheckComplete.current = true;
        
        // Only redirect to login if we're on a protected route
        if (!isPublicRoute(location.pathname)) {
          navigate('/login');
        }
        return;
      }

      // Get user profile
      const profile = await getUserProfile(session);
      
      if (!mounted.current) return;

      if (!profile) {
        setUser(null);
        setIsLoading(false);
        authCheckComplete.current = true;
        
        if (!isPublicRoute(location.pathname)) {
          navigate('/login');
        }
        return;
      }

      // Set user profile
      setUser(profile);
      setIsLoading(false);
      authCheckComplete.current = true;

      // Handle initial redirect if needed
      if (!isPublicRoute(location.pathname)) {
        const currentRole = location.pathname.split('/')[1];
        if (currentRole !== profile.role) {
          const redirectPath = getRoleBasedRedirect(profile.role);
          navigate(redirectPath);
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
        setIsLoading(false);
        authCheckComplete.current = true;
      }
    }
  }, [navigate, location.pathname, isPublicRoute, getRoleBasedRedirect, toast]);

  useEffect(() => {
    mounted.current = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted.current) {
          await handleSession(session);
        }

        // Subscribe to auth changes
        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted.current) return;

          if (event === 'SIGNED_OUT') {
            setUser(null);
            setIsLoading(false);
            if (!isPublicRoute(location.pathname)) {
              navigate('/login');
            }
            return;
          }

          if (session && ['SIGNED_IN', 'TOKEN_REFRESHED'].includes(event)) {
            await handleSession(session);
          }
        }).data.subscription;

      } catch (error) {
        console.error("Auth setup error:", error);
        if (mounted.current) {
          setUser(null);
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
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [handleSession, isPublicRoute, location.pathname, navigate, toast]);

  return { user, setUser, isLoading, setIsLoading };
};
