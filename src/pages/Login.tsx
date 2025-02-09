
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import AuthForm from "@/components/auth/AuthForm";
import { portals } from "@/components/auth/PortalSelection";
import { AuthError } from "@supabase/supabase-js";

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
  const navigate = useNavigate();
  const auth = useAuth();
  const { login, signup, isLoading: authLoading, user } = auth || {};
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      // If user is admin, allow access regardless of portal and redirect to admin dashboard
      if (user.role === "admin") {
        navigate(roleBasedRedirect(user.role));
        return;
      }
      // For non-admin users, check if they're accessing the correct portal
      if (portalParam && user.role === portalParam) {
        navigate(roleBasedRedirect(user.role));
      } else {
        // If user tries to access wrong portal, redirect to their appropriate dashboard
        navigate(roleBasedRedirect(user.role));
      }
    }
  }, [user, navigate, portalParam]);

  useEffect(() => {
    if (!portalParam) {
      navigate("/");
    }
  }, [portalParam, navigate]);

  const handleAuthSubmit = async (email: string, password: string, isSignUp: boolean) => {
    if (!portalParam || !login || !signup) return;

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signup(email, password, portalParam);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error("Auth failed:", error);
      if (error instanceof AuthError) {
        throw new Error(error.message);
      }
      throw new Error("An error occurred during authentication");
    } finally {
      setIsSubmitting(false);
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
        isLoading={isSubmitting}
        onBack={() => navigate("/")}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
};

export default Login;
