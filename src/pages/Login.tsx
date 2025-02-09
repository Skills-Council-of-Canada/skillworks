
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import { User } from "lucide-react";
import { AuthError } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    console.log("Login component user state:", user);
    if (user) {
      console.log("User logged in, redirecting based on role:", user.role);
      setIsSubmitting(false); // Reset loading state before redirect
      const redirectPath = user.role === 'employer' ? '/employer' : '/';
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  const handleAuthSubmit = async (email: string, password: string, isSignUp: boolean) => {
    console.log("Attempting auth submission:", { email, isSignUp });
    if (isSubmitting) {
      console.log("Submission already in progress, ignoring");
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signup(email, password, "participant");
      } else {
        await login(email, password);
      }
      console.log("Auth submission successful");
    } catch (error) {
      console.error("Auth failed:", error);
      setIsSubmitting(false); // Reset loading state on error
      if (error instanceof AuthError) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred during authentication"
        });
      }
      throw error; // Re-throw to prevent further execution
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <AuthForm
        icon={User}
        title="Welcome Back"
        gradient="bg-white"
        isLoading={isSubmitting}
        onBack={() => navigate("/")}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
};

export default Login;
