
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import { User } from "lucide-react";
import { AuthError } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { UserRole } from "@/types/auth";
import PortalSelection from "@/components/auth/PortalSelection";

const Login = () => {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { getRoleBasedRedirect } = useAuthRedirect();
  const [searchParams] = useSearchParams();
  const [selectedPortal, setSelectedPortal] = useState<{ id: string; role: UserRole } | null>(() => {
    const portal = searchParams.get("portal");
    if (portal) {
      return {
        id: portal,
        role: portal as UserRole,
      };
    }
    navigate("/");
    return null;
  });

  useEffect(() => {
    if (!selectedPortal) {
      navigate("/");
      return;
    }

    if (user) {
      console.log("User detected in Login component:", user);
      const redirectPath = getRoleBasedRedirect(user.role);
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [user, selectedPortal, navigate, getRoleBasedRedirect]);

  const handleBack = () => {
    if (selectedPortal) {
      navigate(`/${selectedPortal.id}-landing`);
    } else {
      navigate("/");
    }
  };

  const handleAuthSubmit = async (email: string, password: string, isSignUp: boolean) => {
    if (isSubmitting || !selectedPortal) return;
    
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signup(email, password, selectedPortal.role);
        if (selectedPortal.role === 'educator') {
          return;
        }
      } else {
        const user = await login(email, password);
        console.log("Login successful, user:", user);
        if (!user) {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Please check your email and password and try again."
          });
        }
      }
    } catch (error) {
      console.error("Auth failed:", error);
      if (error instanceof AuthError) {
        if (error.message.includes("Email not confirmed")) {
          toast({
            title: "Email Not Confirmed",
            description: "Please check your email for a confirmation link. A new confirmation email has been sent.",
            variant: "destructive",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: error.message
          });
        }
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

  if (!selectedPortal) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <AuthForm
        icon={User}
        title={`${selectedPortal.id.charAt(0).toUpperCase() + selectedPortal.id.slice(1)} Portal`}
        gradient="bg-white"
        isLoading={isSubmitting}
        onBack={handleBack}
        onSubmit={handleAuthSubmit}
        defaultEmail="employ@skillscouncil.ca"
      />
    </div>
  );
};

export default Login;
