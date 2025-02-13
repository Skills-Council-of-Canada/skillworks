
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import { User } from "lucide-react";
import { AuthError } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { getRoleBasedRedirect } = useAuthRedirect();

  useEffect(() => {
    if (user) {
      const redirectPath = getRoleBasedRedirect(user.role);
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, getRoleBasedRedirect]);

  const handleAuthSubmit = async (email: string, password: string) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const user = await login(email, password);
      if (!user) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Please check your email and password and try again."
        });
      }
    } catch (error) {
      console.error("Auth failed:", error);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <AuthForm
        icon={User}
        title="Welcome Back"
        gradient="bg-white"
        isLoading={isSubmitting}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
};

export default Login;
