
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
    return null;
  });

  useEffect(() => {
    if (user) {
      console.log("User detected in Login component:", user);
      const redirectPath = getRoleBasedRedirect(user.role);
      console.log("Redirecting to:", redirectPath);
      navigate(redirectPath);
    }
  }, [user, navigate, getRoleBasedRedirect]);

  const handlePortalSelect = (portalId: string, role: UserRole) => {
    setSelectedPortal({ id: portalId, role });
  };

  const handleBack = () => {
    if (selectedPortal) {
      // Instead of going back to portal selection, navigate to the landing page
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
        await login(email, password);
      }
    } catch (error) {
      console.error("Auth failed:", error);
      if (error instanceof AuthError) {
        if (error.message.includes("Invalid login credentials")) {
          toast({
            variant: "destructive",
            title: "Invalid Credentials",
            description: "Please check your email and password and try again."
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {!selectedPortal ? (
        <PortalSelection onPortalSelect={handlePortalSelect} />
      ) : (
        <AuthForm
          icon={User}
          title={`${selectedPortal.id.charAt(0).toUpperCase() + selectedPortal.id.slice(1)} Portal`}
          gradient="bg-white"
          isLoading={isSubmitting}
          onBack={handleBack}
          onSubmit={handleAuthSubmit}
          defaultEmail="employ@skillscouncil.ca"
        />
      )}
    </div>
  );
};

export default Login;

