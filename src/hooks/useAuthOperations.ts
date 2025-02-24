
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";
import { signInUser, signOutUser, signUpUser } from "@/services/auth";
import { User, UserRole } from "@/types/auth";
import { useNavigate } from "react-router-dom";

export const useAuthOperations = (setIsLoading: (loading: boolean) => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      console.log("Attempting login with email:", email);
      setIsLoading(true);
      
      if (!email || !password) {
        toast({
          title: "Login Failed",
          description: "Please enter both email and password",
          variant: "destructive",
        });
        return null;
      }

      const { data, error } = await signInUser(email, password);
      if (error) {
        console.error("Login error details:", error);
        
        // Handle specific error cases
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Confirmed",
            description: "Please check your email for a confirmation link. A new confirmation email has been sent.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Login Failed",
            description: "Invalid email or password. Please check your credentials and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login Error",
            description: error.message || "An error occurred during login",
            variant: "destructive",
          });
        }
        return null;
      }

      if (!data?.user) {
        toast({
          title: "Login Failed",
          description: "No user profile found. Please contact support.",
          variant: "destructive",
        });
        return null;
      }

      console.log("Login successful", data.user);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      const authError = error as AuthError;
      toast({
        title: "Error",
        description: authError.message || "An error occurred during login",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, role: UserRole) => {
    try {
      console.log("Attempting signup with email:", email, "and role:", role);
      setIsLoading(true);
      
      const { error: signUpError } = await signUpUser(email, password, role);
      
      if (signUpError) {
        if (signUpError.message.includes("User already registered")) {
          toast({
            title: "Account Exists",
            description: "This email is already registered. Please login instead.",
            variant: "destructive",
          });
          return;
        }
        throw signUpError;
      }

      console.log("Signup successful");
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
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
      setIsLoading(true);
      const { error } = await signOutUser();
      
      if (error) {
        console.error("Logout error:", error);
        toast({
          title: "Error",
          description: "There was an issue during logout. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Logout successful");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      // Clear auth state and navigate
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "There was an issue during logout. Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, signup, logout };
};
