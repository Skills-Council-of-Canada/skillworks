
import { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getUserProfile, signOutUser } from "@/services/auth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getRoleBasedRedirect } = useAuthRedirect();

  const handleProfileError = async (error: Error) => {
    await signOutUser();
    setUser(null);
    setIsLoading(false);
    toast({
      title: "Error",
      description: "There was an error with your account. Please try logging in again.",
      variant: "destructive",
    });
    navigate('/login');
  };

  const handleProfileSuccess = (profile: User | null, isMounted: boolean) => {
    if (!isMounted) return;

    setUser(profile);
    setIsLoading(false);

    if (profile) {
      const redirectPath = getRoleBasedRedirect(profile.role);
      navigate(redirectPath, { replace: true });
    }
  };

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!mounted) return;

      if (!session?.user) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile(session);
        handleProfileSuccess(profile, mounted);
      } catch (error) {
        if (mounted) {
          handleProfileError(error as Error);
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

        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const profile = await getUserProfile(session);
            handleProfileSuccess(profile, mounted);
          } catch (error) {
            if (mounted) {
              handleProfileError(error as Error);
            }
          }
        }
      }).data.subscription;
    };

    setupAuth();

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [navigate, getRoleBasedRedirect, toast]);

  return { user, setUser, isLoading, setIsLoading };
};
