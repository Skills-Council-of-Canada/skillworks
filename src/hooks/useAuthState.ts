
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

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        // If no session, only redirect if not on public routes
        if (!session?.user) {
          console.log("No active session found");
          setUser(null);
          setIsLoading(false);
          if (location.pathname !== '/login' && location.pathname !== '/') {
            navigate('/login');
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
            
            // Only redirect if we're on login/root AND have a valid profile
            if (location.pathname === '/login' || location.pathname === '/') {
              const redirectPath = getRoleBasedRedirect(profile.role);
              console.log("Redirecting authenticated user to:", redirectPath);
              navigate(redirectPath);
            }
          } else {
            console.log("No profile found for user");
            setUser(null);
            // Don't redirect here, let the component handle no-profile state
          }
        } catch (error) {
          console.error("Profile error:", error);
          setUser(null);
          // On profile error, clear session to force re-auth
          await supabase.auth.signOut();
        } finally {
          if (mounted) {
            setIsLoading(false);
          }
        }

        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          console.log("Auth state changed:", event);

          if (event === 'SIGNED_OUT') {
            setUser(null);
            setIsLoading(false);
            if (location.pathname !== '/login') {
              navigate('/login');
            }
            return;
          }

          if (event === 'SIGNED_IN' && session?.user) {
            try {
              const profile = await getUserProfile(session);
              if (mounted && profile) {
                setUser(profile);
                const redirectPath = getRoleBasedRedirect(profile.role);
                console.log("Redirecting after sign in to:", redirectPath);
                navigate(redirectPath);
              }
            } catch (error) {
              console.error("Error after sign in:", error);
              setUser(null);
              await supabase.auth.signOut();
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
