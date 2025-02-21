
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

  // If no user is found, redirect to login
  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required and user's role doesn't match, redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log(`User role ${user.role} not allowed. Redirecting to role-specific dashboard`);
    
    // Redirect to the appropriate dashboard based on user's role
    const roleDashboards = {
      participant: '/participant/dashboard',
      employer: '/employer/dashboard',
      educator: '/educator/dashboard',
      admin: '/admin/dashboard'
    };

    const correctRoute = roleDashboards[user.role];
    if (correctRoute) {
      return <Navigate to={correctRoute} replace />;
    }
    
    // If no matching route, go to unauthorized
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
