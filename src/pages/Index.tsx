
import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn, User } from "lucide-react";
import PortalSelection from "@/components/auth/PortalSelection";
import { UserRole } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { getRoleBasedRedirect } = useAuthRedirect();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePortalSelect = (portalId: string, role: UserRole) => {
    switch (portalId) {
      case "employer":
        navigate("/employer-landing");
        break;
      case "educator":
        navigate("/educator-landing");
        break;
      case "participant":
        navigate("/participant-landing");
        break;
      default:
        break;
    }
  };

  const handleAuthSubmit = async (email: string, password: string) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const user = await login(email, password);
      if (user) {
        const redirectPath = getRoleBasedRedirect(user.role);
        navigate(redirectPath, { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Please check your email and password and try again."
        });
      }
    } catch (error) {
      console.error("Auth failed:", error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "An error occurred during login. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    console.log("Back button clicked on index page");
  };

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 left-0 right-0 h-16 bg-white border-b z-50" />
      
      <main className="relative">
        <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8">
          <h1 className="text-4xl font-bold text-center mb-6">Real-World Experience. Real Opportunities. Real Impact.</h1>
          
          <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <PortalSelection onPortalSelect={handlePortalSelect} />
            </div>
            
            <div className="flex flex-col justify-center space-y-4 order-1 md:order-2">
              <AuthForm
                icon={User}
                title="Sign In"
                gradient="bg-white"
                isLoading={isSubmitting}
                onSubmit={handleAuthSubmit}
                onBack={handleBack}
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/login")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login Page
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
