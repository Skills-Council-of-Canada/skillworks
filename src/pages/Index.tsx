
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getRoleBasedRedirect } = useAuthRedirect();

  useEffect(() => {
    if (user) {
      const redirectPath = getRoleBasedRedirect(user.role);
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, getRoleBasedRedirect]);

  // Show loading or nothing while redirecting
  return null;
};

export default Index;

