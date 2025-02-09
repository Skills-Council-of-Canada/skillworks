
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
    console.error("Profile error:", error);
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

    console.log("Setting user profile:", profile);
    setUser(profile);
    setIsLoading(false);

    if (profile) {
      const redirectPath = getRoleBasedRedirect(profile.role);
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        if (mounted) {
          setUser(null);
          setIsLoading(false);
        }
        return;
      }

      if (!mounted) return;

      try {
        const profile = await getUserProfile(session);
        handleProfileSuccess(profile, mounted);
      } catch (error) {
        if (mounted) {
          handleProfileError(error as Error);
        }
      }
    };

    // Initialize auth state
    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoading(false);
        return;
      }

      if (event === 'SIGNED_IN' && session?.user) {
        setIsLoading(true);
        try {
          const profile = await getUserProfile(session);
          handleProfileSuccess(profile, mounted);
        } catch (error) {
          handleProfileError(error as Error);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, getRoleBasedRedirect, toast]);

  return { user, setUser, isLoading, setIsLoading };
};
