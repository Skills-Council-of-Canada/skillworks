
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - Current user:", user);
  console.log("ProtectedRoute - Allowed roles:", allowedRoles);
  console.log("ProtectedRoute - Current path:", location.pathname);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // If no user is found after loading, redirect to login
  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required and user's role doesn't match, redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(`User role ${user.role} not allowed. Redirecting to unauthorized`);
    return <Navigate to="/unauthorized" replace />;
  }

  // If user tries to access a role-specific path that doesn't match their role
  const pathRole = location.pathname.split('/')[1]; // e.g., 'admin', 'educator', etc.
  if (pathRole && ['admin', 'educator', 'employer', 'participant'].includes(pathRole)) {
    if (pathRole !== user.role) {
      console.log(`User with role ${user.role} attempting to access ${pathRole} path. Redirecting to appropriate dashboard.`);
      const dashboardPath = `/${user.role}/dashboard`;
      return <Navigate to={dashboardPath} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
