
import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { signInUser } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await signInUser(email, password);
      
      if (error) {
        throw error;
      }

      if (data?.user) {
        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });
        
        // Redirect based on user role
        switch (data.user.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "educator":
            navigate("/educator/dashboard");
            break;
          case "employer":
            navigate("/employer/dashboard");
            break;
          case "participant":
            navigate("/participant/dashboard");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
      throw error;
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
