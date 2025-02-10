
import { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserProfile, signOutUser } from "@/services/auth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

// Add debouncing for error handling
let lastToastTime = 0;
const TOAST_DEBOUNCE_MS = 2000; // Only show toast every 2 seconds

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { getRoleBasedRedirect } = useAuthRedirect();

  const handleProfileError = async (error: Error) => {
    console.error("Profile error:", error);
    setUser(null);
    setIsLoading(false);
    
    // Only show toast if enough time has passed since last toast
    const now = Date.now();
    if (now - lastToastTime > TOAST_DEBOUNCE_MS) {
      lastToastTime = now;
      toast({
        title: "Profile Error",
        description: "There was an error loading your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProfileSuccess = (profile: User | null, isMounted: boolean) => {
    if (!isMounted) return;

    if (!profile) {
      console.log("No profile found");
      // Only show toast if enough time has passed
      const now = Date.now();
      if (now - lastToastTime > TOAST_DEBOUNCE_MS) {
        lastToastTime = now;
        toast({
          title: "Profile Error",
          description: "No profile found for your account. Please contact support.",
          variant: "destructive",
        });
      }
      return;
    }

    console.log("Setting user profile:", profile);
    setUser(profile);
    setIsLoading(false);

    // Only redirect if we're not already on a valid path for the user's role
    if (profile) {
      const redirectPath = getRoleBasedRedirect(profile.role);
      const currentPath = location.pathname;
      const isOnValidPath = currentPath.startsWith(redirectPath);
      
      if (!isOnValidPath && currentPath !== '/login') {
        console.log("Redirecting to:", redirectPath);
        navigate(redirectPath, { replace: true });
      }
    }
  };

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

        console.log("Session found for user:", session.user.id);
        
        try {
          const profile = await getUserProfile(session);
          console.log("Retrieved profile:", profile);
          handleProfileSuccess(profile, mounted);
        } catch (error) {
          if (mounted) {
            handleProfileError(error as Error);
          }
        }

        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state change event:", event);
          
          if (!mounted) return;

          if (event === 'SIGNED_OUT') {
            console.log("User signed out");
            setUser(null);
            setIsLoading(false);
            navigate('/login');
            return;
          }

          if (event === 'SIGNED_IN' && session?.user) {
            console.log("User signed in:", session.user.id);
            try {
              const profile = await getUserProfile(session);
              console.log("Retrieved profile after sign in:", profile);
              handleProfileSuccess(profile, mounted);
            } catch (error) {
              if (mounted) {
                handleProfileError(error as Error);
              }
            }
          }
        }).data.subscription;
      } catch (error) {
        console.error("Error in setupAuth:", error);
        if (mounted) {
          handleProfileError(error as Error);
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
