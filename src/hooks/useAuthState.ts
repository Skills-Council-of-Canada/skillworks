
import { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getUserProfile, signOutUser } from "@/services/auth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getRoleBasedRedirect } = useAuthRedirect();

  const handleProfileError = async () => {
    await signOutUser();
    setUser(null);
    toast({
      title: "Error",
      description: "There was an error loading your profile. Please try logging in again.",
      variant: "destructive",
    });
  };

  const handleProfileSuccess = (profile: User | null) => {
    if (profile) {
      console.log("Setting user and redirecting...");
      setUser(profile);
      const redirectPath = getRoleBasedRedirect(profile.role);
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath);
    }
  };

  useEffect(() => {
    console.log("Starting auth initialization...");
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log("Fetching initial session...");
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session fetch complete:", session?.user?.email);
        
        if (!mounted) return;

        if (session?.user) {
          console.log("Valid session found, fetching profile...");
          try {
            const profile = await getUserProfile(session);
            console.log("Profile fetch result:", profile);
            
            if (mounted) {
              handleProfileSuccess(profile);
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
            await handleProfileError();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up auth state change listener
    console.log("Setting up auth state change listener...");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (!mounted) return;

      if (event === 'SIGNED_OUT') {
        console.log("User signed out, clearing state...");
        setUser(null);
        setIsLoading(false);
        navigate('/');
        return;
      }

      if (session?.user) {
        console.log("Session detected, fetching profile...");
        try {
          const profile = await getUserProfile(session);
          console.log("Profile fetch complete:", profile);
          
          if (mounted) {
            handleProfileSuccess(profile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          await handleProfileError();
        }
      }
      setIsLoading(false);
    });

    // Start initialization
    initializeAuth();

    // Cleanup function
    return () => {
      console.log("Cleaning up auth context...");
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, getRoleBasedRedirect, toast]);

  return { user, setUser, isLoading, setIsLoading };
};
