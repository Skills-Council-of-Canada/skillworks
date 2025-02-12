
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

  const handleAuthSubmit = async (username: string, password: string, isSignUp: boolean) => {
    if (isSubmitting || !selectedPortal) return;
    
    setIsSubmitting(true);
    try {
      const portalUsername = selectedPortal.id; // This will be 'employ', 'educator', etc.
      const user = await login(username || portalUsername, password);
      console.log("Login successful, user:", user);
      if (!user) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Please check your username and password and try again."
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
        defaultUsername={selectedPortal.id}
        showEmailField={false}
      />
    </div>
  );
};

export default Login;
