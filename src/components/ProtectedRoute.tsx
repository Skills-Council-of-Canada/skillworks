
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { Loader2 } from "lucide-react";
import { memo, FC, useEffect, useRef, useCallback } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRouteBase: FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const mounted = useRef(true);
  const processingAuth = useRef(false);
  const lastKnownRole = useRef<UserRole | null>(null);

  const isPublicRoute = useCallback((path: string) => {
    const publicPaths = [
      '/login', 
      '/employer-landing', 
      '/educator-landing', 
      '/participant-landing', 
      '/', 
      '/home',
      '/career-pathways',
      '/registration'
    ];
    return publicPaths.includes(path) || path.startsWith('/registration/');
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // If on a public route, allow access
  if (isPublicRoute(location.pathname)) {
    return <>{children}</>;
  }

  // If not authenticated and not on a public route, redirect to login
  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("User role not allowed:", user.role);
    return <Navigate to="/unauthorized" replace />;
  }

  // Get current path role
  const pathRole = location.pathname.split('/')[1];

  // Check if current path matches user role
  if (pathRole && ['admin', 'educator', 'employer', 'participant'].includes(pathRole)) {
    if (pathRole !== user.role) {
      console.log("Path role mismatch:", { pathRole, userRole: user.role });
      const dashboardPath = `/${user.role}/dashboard`;
      return <Navigate to={dashboardPath} replace />;
    }
  }

  return <>{children}</>;
};

const ProtectedRoute = memo(ProtectedRouteBase);
ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;
