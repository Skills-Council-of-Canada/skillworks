
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";
import { signInUser, signOutUser, signUpUser } from "@/services/auth";
import { UserRole } from "@/types/auth";
import { useNavigate } from "react-router-dom";

export const useAuthOperations = (setIsLoading: (loading: boolean) => void) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with email:", email);
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

  const signup = async (email: string, password: string, role: UserRole) => {
    try {
      console.log("Attempting signup with email:", email, "and role:", role);
      setIsLoading(true);
      const { error } = await signUpUser(email, password, role);
      if (error) throw error;

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
      await signOutUser();
      
      console.log("Logout successful");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      // Changed from /login to / to return to index page
      navigate("/");
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
