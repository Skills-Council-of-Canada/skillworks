
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
    console.log("Login page render state:", { 
      user, 
      authLoading, 
      portalParam,
      isSubmitting 
    });

    // Don't redirect while loading auth state
    if (authLoading) {
      return;
    }

    // If user is authenticated, handle redirect
    if (user) {
      console.log("Handling authenticated user redirect");
      const redirectPath = user.role === "admin" && portalParam 
        ? roleBasedRedirect(portalParam as UserRole) 
        : roleBasedRedirect(user.role);
      
      navigate(redirectPath);
      return;
    }

    // If no portal selected and not authenticated, go to portal selection
    if (!portalParam && !authLoading && !user) {
      console.log("No portal selected, redirecting to home");
      navigate("/");
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

  // Render nothing while auth is loading
  if (authLoading) {
    console.log("Auth is loading, rendering nothing");
    return null;
  }

  // If authenticated, render nothing (redirect will happen)
  if (user) {
    console.log("User is authenticated, rendering nothing");
    return null;
  }

  // If no portal selected, render nothing (redirect will happen)
  if (!portalParam) {
    console.log("No portal selected, rendering nothing");
    return null;
  }

  const currentPortal = portals.find(p => p.id === portalParam);
  if (!currentPortal) {
    console.log("Invalid portal selected, rendering nothing");
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
