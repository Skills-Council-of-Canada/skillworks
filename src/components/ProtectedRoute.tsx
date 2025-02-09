
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - Current user:", user);
  console.log("ProtectedRoute - Allowed roles:", allowedRoles);
  console.log("ProtectedRoute - Current path:", location.pathname);

  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required, check if user has one of them
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(`User role ${user.role} not in allowed roles:`, allowedRoles);
    // Redirect to the role-specific dashboard or unauthorized page
    if (user.role === "educator") {
      return <Navigate to="/educator" replace />;
    } else if (user.role === "employer") {
      return <Navigate to="/employer" replace />;
    } else if (user.role === "participant") {
      return <Navigate to="/participant" replace />;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
