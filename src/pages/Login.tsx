
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import AuthForm from "@/components/auth/AuthForm";
import { portals } from "@/components/auth/PortalSelection";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const [searchParams] = useSearchParams();
  const portalParam = searchParams.get("portal");
  const navigate = useNavigate();
  const { login, signup, user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get portal info first to avoid multiple lookups
  const currentPortal = portals.find(p => p.id === portalParam);

  console.log("Login component render:", {
    user,
    authLoading,
    portalParam,
    isSubmitting,
    currentPortal: currentPortal?.id
  });

  // If there's no portal param or it's invalid, redirect to home
  useEffect(() => {
    if (!portalParam || !currentPortal) {
      console.log("No portal param or invalid portal, redirecting to home");
      navigate("/");
    }
  }, [portalParam, currentPortal, navigate]);

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

  // Show global loading state while auth is initializing
  if (authLoading && !user) {
    console.log("Auth is initializing...");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Initializing...</div>
      </div>
    );
  }

  // Don't render form if no portal is selected or portal is invalid
  if (!portalParam || !currentPortal) {
    console.log("No portal or invalid portal");
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
