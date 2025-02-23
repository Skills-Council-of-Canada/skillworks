
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { Loader2 } from "lucide-react";
import { memo, FC } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRouteBase: FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Only log on development
  if (process.env.NODE_ENV === 'development') {
    console.log("ProtectedRoute render for path:", location.pathname);
  }

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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Extract the role from the current path
  const pathRole = location.pathname.split('/')[1]; // e.g., 'admin', 'educator', etc.

  // If specific roles are required and user's role doesn't match, redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Validate that the user's role matches the path they're trying to access
  if (pathRole && ['admin', 'educator', 'employer', 'participant'].includes(pathRole)) {
    if (pathRole !== user.role) {
      const dashboardPath = `/${user.role}/dashboard`;
      return <Navigate to={dashboardPath} replace />;
    }
  }

  return <>{children}</>;
};

const ProtectedRoute = memo(ProtectedRouteBase);
ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;
