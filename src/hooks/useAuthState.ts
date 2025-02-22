
import { useState, useEffect } from "react";
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

  // Cache profile data in memory
  const profileCache = new Map<string, User>();

  // Define public routes that don't require authentication
  const isPublicRoute = (path: string) => {
    if (path.includes('/registration')) {
      return true;
    }
    
    const publicPaths = [
      '/login',
      '/employer-landing',
      '/educator-landing',
      '/participant-landing',
      '/'
    ];
    return publicPaths.includes(path) || publicPaths.some(prefix => path.startsWith(prefix + '?'));
  };

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        // Early return for registration pages
        if (location.pathname.includes('/registration')) {
          setIsLoading(false);
          return;
        }

        // Handle no session case
        if (!session?.user) {
          setUser(null);
          setIsLoading(false);
          if (!isPublicRoute(location.pathname)) {
            navigate('/login');
          }
          return;
        }

        // Handle existing session
        try {
          // Use cached profile if available
          let profile = profileCache.get(session.user.id);
          
          if (!profile) {
            profile = await getUserProfile(session);
            if (profile) {
              profileCache.set(session.user.id, profile);
            }
          }

          if (!mounted) return;

          if (!profile) {
            setUser(null);
            setIsLoading(false);
            if (!isPublicRoute(location.pathname)) {
              navigate('/login');
            }
            return;
          }

          setUser(profile);

          // Only redirect if we're on login or root
          if (location.pathname === '/login' || location.pathname === '/') {
            navigate(getRoleBasedRedirect(profile.role), { replace: true });
          }

          setIsLoading(false);
        } catch (error) {
          console.error("Profile error:", error);
          if (mounted) {
            toast({
              title: "Error",
              description: "Failed to load user profile",
              variant: "destructive",
            });
            setUser(null);
            setIsLoading(false);
            if (!isPublicRoute(location.pathname)) {
              navigate('/login');
            }
          }
        }

        // Set up auth subscription
        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          if (event === 'SIGNED_OUT') {
            setUser(null);
            profileCache.clear();
            setIsLoading(false);
            if (!isPublicRoute(location.pathname)) {
              navigate('/login', { replace: true });
            }
            return;
          }

          if (event === 'SIGNED_IN' && session?.user) {
            try {
              const profile = profileCache.get(session.user.id) || await getUserProfile(session);
              if (profile && mounted) {
                profileCache.set(session.user.id, profile);
                setUser(profile);
                if (location.pathname === '/login' || location.pathname === '/') {
                  navigate(getRoleBasedRedirect(profile.role), { replace: true });
                }
              }
            } catch (error) {
              console.error("Error after sign in:", error);
              toast({
                title: "Error",
                description: "Failed to load user profile",
                variant: "destructive",
              });
              setUser(null);
            } finally {
              if (mounted) {
                setIsLoading(false);
              }
            }
          }
        }).data.subscription;

      } catch (error) {
        console.error("Error in setupAuth:", error);
        if (mounted) {
          toast({
            title: "Authentication Error",
            description: "There was a problem with the authentication service",
            variant: "destructive",
          });
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    setupAuth();

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [location.pathname]);

  return { user, setUser, isLoading, setIsLoading };
};
