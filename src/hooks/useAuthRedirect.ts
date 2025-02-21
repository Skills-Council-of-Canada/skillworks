
import { UserRole } from "@/types/auth";
import { useLocation } from "react-router-dom";

export const useAuthRedirect = () => {
  const location = useLocation();

  const getRoleBasedRedirect = (role: UserRole): string => {
    console.log("Getting redirect path for role:", role);
    
    // If we have a 'from' location state, prioritize returning there
    const state = location.state as { from?: Location };
    if (state?.from && state.from.pathname) {
      // Verify the path matches the user's role
      const pathSegments = state.from.pathname.split('/');
      const rolePath = pathSegments[1]; // e.g., 'admin', 'employer', 'participant', 'educator'
      
      // Add 'educator' to the valid roles check
      if (rolePath === role || (role === 'educator' && rolePath === 'educator')) {
        console.log("Redirecting to previous location:", state.from.pathname);
        return state.from.pathname;
      }
    }

    // Default role-based redirects
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "employer":
        return "/employer/dashboard";
      case "educator":
        return "/educator/dashboard"; // Make sure this matches the route exactly
      case "participant":
        return "/participant/dashboard";
      default:
        console.log("No matching role found, defaulting to index");
        return "/";
    }
  };

  return { getRoleBasedRedirect };
};
