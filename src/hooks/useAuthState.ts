
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

  // Check if current route matches user role
  const isValidRouteForRole = (path: string, role: string) => {
    return path.startsWith(`/${role.toLowerCase()}`);
  };

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (location.pathname.includes('/registration')) {
          setIsLoading(false);
          return;
        }

        // Handle no session case
        if (!session?.user) {
          console.log("No active session found");
          setUser(null);
          setIsLoading(false);
          if (!isPublicRoute(location.pathname)) {
            navigate('/login', { state: { from: location } });
          }
          return;
        }

        // Handle existing session
        try {
          // Use cached profile if available
          let profile: User | null = null;
          if (profileCache.has(session.user.id)) {
            profile = profileCache.get(session.user.id)!;
            setUser(profile);
            setIsLoading(false);
          } else {
            profile = await getUserProfile(session);
            if (profile) {
              profileCache.set(session.user.id, profile);
              setUser(profile);
            }
          }

          if (!profile) {
            console.log("No profile found for user");
            setUser(null);
            if (!isPublicRoute(location.pathname)) {
              navigate('/login');
            }
            setIsLoading(false);
            return;
          }

          // Only redirect if:
          // 1. We're on a public route (login or root)
          // 2. We're on a route that doesn't match the user's role
          const shouldRedirect = 
            (location.pathname === '/login' || location.pathname === '/') ||
            (!isValidRouteForRole(location.pathname, profile.role) && !isPublicRoute(location.pathname));

          if (shouldRedirect) {
            const redirectPath = getRoleBasedRedirect(profile.role);
            console.log(`Redirecting to ${redirectPath} from ${location.pathname}`);
            navigate(redirectPath, { replace: true });
          }

          setIsLoading(false);
        } catch (error) {
          console.error("Profile error:", error);
          toast({
            title: "Error",
            description: "Failed to load user profile. Please try logging in again.",
            variant: "destructive",
          });
          setUser(null);
          if (!isPublicRoute(location.pathname)) {
            navigate('/login');
          }
          setIsLoading(false);
        }

        // Set up auth subscription
        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          console.log("Auth state changed:", event);

          if (event === 'SIGNED_OUT') {
            setUser(null);
            profileCache.clear();
            if (!isPublicRoute(location.pathname)) {
              navigate('/login', { replace: true });
            }
            setIsLoading(false);
            return;
          }

          if (event === 'SIGNED_IN' && session?.user) {
            try {
              let profile = profileCache.get(session.user.id) || await getUserProfile(session);
              
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
                description: "Failed to load user profile. Please try logging in again.",
                variant: "destructive",
              });
              setUser(null);
              navigate('/login', { replace: true });
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
            description: "There was a problem with the authentication service. Please try again.",
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
  }, [navigate, getRoleBasedRedirect, location.pathname, toast]);

  return { user, setUser, isLoading, setIsLoading };
};
