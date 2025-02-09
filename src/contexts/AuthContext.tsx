
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
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session && mounted) {
          const userProfile = await getUserProfile(session);
          setUser(userProfile);
        } else if (mounted) {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (session && mounted) {
        const userProfile = await getUserProfile(session);
        setUser(userProfile);
      } else if (mounted) {
        setUser(null);
      }
      
      if (mounted) {
        setIsLoading(false);
        if (event === 'SIGNED_OUT') {
          navigate('/');
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signup = async (email: string, password: string, portal: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await signUpUser(email, password, portal);
      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
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

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await signInUser(email, password);
      if (error) throw error;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .single();

      if (profile) {
        const role = profile.role as string;
        if (isValidUserRole(role)) {
          const redirectPath = getRoleBasedRedirect(role);
          navigate(redirectPath);
        } else {
          console.error("Invalid role received from database:", profile.role);
          navigate('/');
        }
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
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

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await signOutUser();
      if (error) throw error;
      
      setUser(null);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper function to type check UserRole
function isValidUserRole(role: string): role is UserRole {
  return ['admin', 'educator', 'employer', 'participant'].includes(role);
}
