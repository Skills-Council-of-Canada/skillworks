
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

  // Define public routes that don't require authentication
  const isPublicRoute = (path: string) => {
    // Registration routes should always be public
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

        // If we're on a registration page, don't enforce authentication
        if (location.pathname.includes('/registration')) {
          setIsLoading(false);
          return;
        }

        if (!session?.user) {
          console.log("No active session found");
          setUser(null);
          setIsLoading(false);
          // Only redirect to login if we're not on a public route
          if (!isPublicRoute(location.pathname)) {
            console.log("Not a public route, redirecting to login:", location.pathname);
            navigate('/login', { state: { from: location } });
          }
          return;
        }

        try {
          console.log("Fetching profile for user:", session.user.id);
          const profile = await getUserProfile(session);
          
          if (!mounted) return;

          if (profile) {
            console.log("Profile found:", profile);
            setUser(profile);
            
            // Only redirect if we're on a login page or root
            if (location.pathname === '/login' || location.pathname === '/') {
              const redirectPath = getRoleBasedRedirect(profile.role);
              console.log("Login/root path detected, redirecting to:", redirectPath);
              navigate(redirectPath, { replace: true }); // Add replace: true to avoid history stack issues
            }
          } else {
            console.log("No profile found for user");
            setUser(null);
            if (!isPublicRoute(location.pathname)) {
              navigate('/login', { state: { from: location } });
            }
          }
        } catch (error) {
          console.error("Profile error:", error);
          toast({
            title: "Error",
            description: "Failed to load user profile. Please try logging in again.",
            variant: "destructive",
          });
          setUser(null);
          if (!isPublicRoute(location.pathname)) {
            navigate('/login', { state: { from: location } });
          }
        } finally {
          if (mounted) {
            setIsLoading(false);
          }
        }

        // Set up auth subscription
        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          console.log("Auth state changed:", event);

          if (event === 'SIGNED_OUT') {
            setUser(null);
            setIsLoading(false);
            if (!isPublicRoute(location.pathname)) {
              navigate('/login', { replace: true }); // Add replace: true
            }
            return;
          }

          if (event === 'SIGNED_IN' && session?.user) {
            try {
              const profile = await getUserProfile(session);
              if (mounted && profile) {
                setUser(profile);
                // Only redirect if we're on a login page or root
                if (location.pathname === '/login' || location.pathname === '/') {
                  const redirectPath = getRoleBasedRedirect(profile.role);
                  console.log("Redirecting after sign in to:", redirectPath);
                  navigate(redirectPath, { replace: true }); // Add replace: true
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
              navigate('/login', { replace: true }); // Add replace: true
            } finally {
              if (mounted) {
                setIsLoading(false);
              }
            }
          }
        }).data.subscription;

      } catch (error) {
        console.error("Error in setupAuth:", error);
        toast({
          title: "Authentication Error",
          description: "There was a problem with the authentication service. Please try again.",
          variant: "destructive",
        });
        if (mounted) {
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
