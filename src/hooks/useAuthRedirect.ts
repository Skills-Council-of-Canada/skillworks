
import { UserRole } from "@/types/auth";
import { useLocation } from "react-router-dom";

export const useAuthRedirect = () => {
  const location = useLocation();

  const getRoleBasedRedirect = (role: UserRole): string => {
    console.log("Getting redirect path for role:", role);
    
    // If we have a 'from' location state and it matches the user's role, use that
    const state = location.state as { from?: Location };
    if (state?.from && state.from.pathname) {
      const pathSegments = state.from.pathname.split('/');
      const rolePath = pathSegments[1]; // e.g., 'admin', 'employer', 'participant'
      
      // Only redirect to previous location if it matches the user's role
      if (rolePath === role || (role === 'admin' && rolePath === 'admin')) {
        console.log("Redirecting to previous location:", state.from.pathname);
        return state.from.pathname;
      }
    }

    // Default role-based redirects - ensure admin goes directly to /admin
    switch (role) {
      case "admin":
        return "/admin"; // Direct path for admin
      case "employer":
        return "/employer/dashboard";
      case "educator":
        return "/educator";
      case "participant":
        return "/participant/dashboard";
      default:
        console.log("No matching role found, defaulting to index");
        return "/";
    }
  };

  return { getRoleBasedRedirect };
};
