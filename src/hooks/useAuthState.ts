
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
    console.log("Handling profile error:", error);
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

    if (profile) {
      console.log("Setting user profile:", profile);
      setUser(profile);
      const redirectPath = getRoleBasedRedirect(profile.role);
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath);
    } else {
      handleProfileError(new Error("No profile found"));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Starting auth initialization...");
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log("Fetching initial session...");
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session fetch complete:", session?.user?.email);
        
        if (!session?.user) {
          console.log("No active session found");
          if (mounted) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }

        if (!mounted) return;

        setIsLoading(true);
        console.log("Valid session found, fetching profile...");
        try {
          const profile = await getUserProfile(session);
          console.log("Profile fetch result:", profile);
          handleProfileSuccess(profile, mounted);
        } catch (error) {
          console.error("Error fetching profile:", error);
          if (mounted) {
            handleProfileError(error as Error);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (!mounted) return;

      if (event === 'SIGNED_OUT') {
        console.log("User signed out, clearing state...");
        setUser(null);
        navigate('/');
        return;
      }

      if (!session?.user) {
        console.log("No session in auth change");
        setUser(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      console.log("Session detected, fetching profile...");
      try {
        const profile = await getUserProfile(session);
        console.log("Profile fetch complete:", profile);
        handleProfileSuccess(profile, mounted);
      } catch (error) {
        console.error("Error fetching profile:", error);
        handleProfileError(error as Error);
      }
    });

    initializeAuth();

    return () => {
      console.log("Cleaning up auth context...");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, getRoleBasedRedirect, toast]);

  return { user, setUser, isLoading, setIsLoading };
};
