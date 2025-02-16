
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import { User, Home } from "lucide-react";
import { AuthError } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Button } from "@/components/ui/button";

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

  const handleAuthSubmit = async (identifier: string, password: string) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      console.log("Attempting login with:", identifier);
      const user = await login(identifier, password);
      
      if (!user) {
        console.log("Login failed - no user returned");
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Please check your credentials and try again."
        });
      } else {
        console.log("Login successful, user:", user);
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-secondary hover:text-primary"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Login Form */}
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <AuthForm
          icon={User}
          title="Welcome Back"
          gradient="bg-white"
          isLoading={isSubmitting}
          onSubmit={handleAuthSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
