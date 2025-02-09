
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

  // Get portal info first to avoid multiple lookups
  const currentPortal = portals.find(p => p.id === portalParam);

  // If there's no portal param or it's invalid, redirect to home
  useEffect(() => {
    if (!portalParam || !currentPortal) {
      console.log("No portal param or invalid portal, redirecting to home");
      navigate("/");
    }
  }, [portalParam, currentPortal, navigate]);

  // Handle authenticated user redirects
  useEffect(() => {
    if (user) {
      console.log("User authenticated, redirecting to:", user.role);
      const redirectPath = user.role === "admin" && portalParam 
        ? roleBasedRedirect(portalParam as UserRole) 
        : roleBasedRedirect(user.role);
      navigate(redirectPath);
    }
  }, [user, portalParam, navigate]);

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

  // Don't render form if no portal is selected or portal is invalid
  if (!portalParam || !currentPortal) {
    return null;
  }

  // Don't render form if user is already authenticated
  if (user) {
    return null;
  }

  // Show loading spinner only during form submission
  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  // Render the auth form
  console.log("Rendering auth form for portal:", currentPortal.id);
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
