
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

  console.log("Login page initial state:", {
    user,
    authLoading,
    portalParam,
    isSubmitting,
    url: window.location.href,
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    if (authLoading) {
      console.log("Auth is still loading, waiting...");
      return;
    }

    console.log("Handling redirects:", { user, portalParam });

    if (!portalParam) {
      console.log("No portal selected, redirecting to home");
      navigate("/");
      return;
    }

    if (user) {
      console.log("User authenticated, redirecting based on role:", user.role);
      const redirectPath = user.role === "admin" && portalParam 
        ? roleBasedRedirect(portalParam as UserRole) 
        : roleBasedRedirect(user.role);
      
      navigate(redirectPath);
      return;
    }
  }, [user, navigate, portalParam, authLoading]);

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

  // Show loading state
  if (authLoading || isSubmitting) {
    console.log("Loading state...");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  // Validate portal param
  if (!portalParam) {
    console.log("No portal param, will redirect...");
    return null;
  }

  // Get portal info
  const currentPortal = portals.find(p => p.id === portalParam);
  if (!currentPortal) {
    console.log("Invalid portal:", portalParam);
    return null;
  }

  // Don't show form if user is already authenticated
  if (user) {
    console.log("User already authenticated:", user.email);
    return null;
  }

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
