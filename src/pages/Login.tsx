
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
  const { login, signup, user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authLoading) return; // Don't redirect while auth state is loading
    if (!user) return;

    // For admin users, always respect their portal choice if provided
    if (user.role === "admin" && portalParam) {
      navigate(roleBasedRedirect(portalParam as UserRole));
      return;
    }

    // For non-admin users or admins without portal param
    navigate(roleBasedRedirect(user.role));
  }, [user, navigate, portalParam, authLoading]);

  useEffect(() => {
    if (!portalParam && !authLoading) {
      navigate("/");
    }
  }, [portalParam, navigate, authLoading]);

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

  // Show nothing while checking initial auth state
  if (authLoading) return null;
  
  // Show nothing if no portal selected (will redirect to home)
  if (!portalParam) return null;

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
