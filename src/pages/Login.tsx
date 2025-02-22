
import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { signInUser } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserRole } from "@/types/auth";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await signInUser(email, password);
      
      if (error) {
        throw error;
      }

      if (data?.user) {
        // Ensure the user has a valid role
        const validRoles: UserRole[] = ['admin', 'educator', 'employer', 'participant'];
        if (!validRoles.includes(data.user.role)) {
          throw new Error('Invalid user role');
        }

        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });
        
        // Get the intended destination from location state or use role-based dashboard
        const state = location.state as { from?: Location };
        const destination = state?.from?.pathname || `/${data.user.role}/dashboard`;
        
        // Use replace: true to prevent back button from returning to login
        navigate(destination, { replace: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-start justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-24">
        <div className="w-full max-w-md mx-auto">
          <AuthForm 
            onBack={() => navigate("/")}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            gradient="bg-gradient-to-br from-primary/5 to-secondary/5"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
