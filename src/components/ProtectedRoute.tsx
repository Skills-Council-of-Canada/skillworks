
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { Loader2 } from "lucide-react";
import { memo, FC, useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRouteBase: FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Get current path role
  const pathRole = location.pathname.split('/')[1];

  // Check if current path matches user role
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

