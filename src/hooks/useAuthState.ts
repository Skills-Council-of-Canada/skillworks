
import { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserProfile, signOutUser } from "@/services/auth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

        if (!session?.user) {
          console.log("No active session found");
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Only fetch profile if we're not on the index page
        if (location.pathname !== '/') {
          try {
            const profile = await getUserProfile(session);
            if (mounted) {
              if (profile) {
                setUser(profile);
                // Only redirect if we're not already on a valid path for the user's role
                const redirectPath = getRoleBasedRedirect(profile.role);
                const currentPath = location.pathname;
                const isOnValidPath = currentPath.startsWith(redirectPath);
                
                if (!isOnValidPath && currentPath !== '/login') {
                  navigate(redirectPath, { replace: true });
                }
              }
              setIsLoading(false);
            }
          } catch (error) {
            if (mounted) {
              console.error("Profile error:", error);
              setUser(null);
              setIsLoading(false);
            }
          }
        }

        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          if (event === 'SIGNED_OUT') {
            setUser(null);
            setIsLoading(false);
            navigate('/login');
            return;
          }

          if (event === 'SIGNED_IN' && session?.user && location.pathname !== '/') {
            try {
              const profile = await getUserProfile(session);
              if (mounted && profile) {
                setUser(profile);
                const redirectPath = getRoleBasedRedirect(profile.role);
                navigate(redirectPath, { replace: true });
              }
            } catch (error) {
              if (mounted) {
                console.error("Error after sign in:", error);
                setUser(null);
              }
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
  }, [navigate, getRoleBasedRedirect, toast, location.pathname]);

  return { user, setUser, isLoading, setIsLoading };
};
