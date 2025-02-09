
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import AuthForm from "@/components/auth/AuthForm";
import { portals } from "@/components/auth/PortalSelection";

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
  const [searchParams] = useSearchParams();
  const portalParam = searchParams.get("portal");
  const { login, signup, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirectPath = roleBasedRedirect(user.role);
      navigate(redirectPath);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!portalParam) {
      navigate("/");
    }
  }, [portalParam, navigate]);

  const handleAuthSubmit = async (email: string, password: string, isSignUp: boolean) => {
    if (!portalParam) return;

    try {
      const portalEmail = `${email.split('@')[0]}_${portalParam}@${email.split('@')[1]}`;
      
      if (isSignUp) {
        await signup(portalEmail, password);
      } else {
        await login(portalEmail, password);
      }
    } catch (error) {
      console.error("Auth failed:", error);
    }
  };

  if (!portalParam) {
    return null;
  }

  const currentPortal = portals.find(p => p.id === portalParam)!;

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentPortal.gradient} px-4`}>
      <AuthForm
        icon={currentPortal.icon}
        title={currentPortal.title}
        gradient={currentPortal.gradient}
        isLoading={isLoading}
        onBack={() => navigate("/")}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
};

export default Login;

