
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import PortalSelection, { portals } from "@/components/auth/PortalSelection";
import AuthForm from "@/components/auth/AuthForm";

const roleBasedRedirect = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "/admin";
    case "employer":
      return "/employer";
    case "educator":
      return "/educator";
    case "participant":
      return "/dashboard";
    default:
      return "/dashboard";
  }
};

const Login = () => {
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const { login, signup, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirectPath = roleBasedRedirect(user.role);
      navigate(redirectPath);
    }
  }, [user, navigate]);

  const handleAuthSubmit = async (email: string, password: string, isSignUp: boolean) => {
    if (!selectedPortal) return;

    try {
      const portalEmail = `${email.split('@')[0]}_${selectedPortal}@${email.split('@')[1]}`;
      
      if (isSignUp) {
        await signup(portalEmail, password);
      } else {
        await login(portalEmail, password);
      }
    } catch (error) {
      console.error("Auth failed:", error);
    }
  };

  if (!selectedPortal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 px-4">
        <PortalSelection onPortalSelect={setSelectedPortal} />
      </div>
    );
  }

  const currentPortal = portals.find(p => p.id === selectedPortal)!;

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentPortal.gradient} px-4`}>
      <AuthForm
        icon={currentPortal.icon}
        title={currentPortal.title}
        gradient={currentPortal.gradient}
        isLoading={isLoading}
        onBack={() => setSelectedPortal(null)}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
};

export default Login;
