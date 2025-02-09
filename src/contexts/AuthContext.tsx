
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User, UserRole } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { getUserProfile, signInUser, signOutUser, signUpUser } from "@/services/auth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getRoleBasedRedirect } = useAuthRedirect();

  // Initialize auth state
  useEffect(() => {
    console.log("Starting auth initialization...");
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log("Fetching initial session...");
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session fetch complete:", session?.user?.email);
        
        if (!mounted) {
          console.log("Component unmounted during initialization");
          return;
        }

        if (session?.user) {
          console.log("Valid session found, fetching profile...");
          const profile = await getUserProfile(session);
          console.log("Profile fetch result:", profile);
          
          if (profile && mounted) {
            console.log("Setting user and redirecting...");
            setUser(profile);
            const redirectPath = getRoleBasedRedirect(profile.role);
            console.log("Redirecting to:", redirectPath);
            navigate(redirectPath);
          }
        } else {
          console.log("No valid session found");
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        if (mounted) {
          console.log("Setting loading to false");
          setIsLoading(false);
        }
      }
    };

    // Set up auth state change listener
    console.log("Setting up auth state change listener...");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (!mounted) {
        console.log("Component unmounted during auth state change");
        return;
      }

      if (event === 'SIGNED_OUT') {
        console.log("User signed out, clearing state...");
        setUser(null);
        setIsLoading(false);
        navigate('/');
        return;
      }

      if (session?.user) {
        console.log("Session detected, fetching profile...");
        const profile = await getUserProfile(session);
        console.log("Profile fetch complete:", profile);
        
        if (profile && mounted) {
          console.log("Setting user and redirecting...");
          setUser(profile);
          const redirectPath = getRoleBasedRedirect(profile.role);
          console.log("Redirecting to:", redirectPath);
          navigate(redirectPath);
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
  }, [navigate, getRoleBasedRedirect]);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login...");
      setIsLoading(true);
      const { error } = await signInUser(email, password);
      if (error) throw error;

      console.log("Login successful");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      console.error("Login error:", error);
      const authError = error as AuthError;
      toast({
        title: "Error",
        description: authError.message || "An error occurred during login",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, portal: string) => {
    try {
      console.log("Attempting signup...");
      setIsLoading(true);
      const { data, error } = await signUpUser(email, password, portal);
      if (error) throw error;

      if (data.user) {
        console.log("Signup successful");
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      const authError = error as AuthError;
      toast({
        title: "Error",
        description: authError.message || "An error occurred during signup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Attempting logout...");
      const { error } = await signOutUser();
      if (error) throw error;
      
      setUser(null);
      console.log("Logout successful");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
