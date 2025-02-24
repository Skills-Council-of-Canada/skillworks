
import { UserRole } from "@/types/auth";
import { useLocation } from "react-router-dom";

export const useAuthRedirect = () => {
  const location = useLocation();

  const getRoleBasedRedirect = (role: UserRole): string => {
    console.log("Getting redirect path for role:", role);
    
    // If user is already on their dashboard, don't redirect
    const currentPath = location.pathname;
    const expectedDashboardPath = `/${role}/dashboard`;
    if (currentPath === expectedDashboardPath) {
      console.log("User already on correct dashboard:", currentPath);
      return currentPath;
    }
    
    // If we have a 'from' location state, verify it matches the user's role
    const state = location.state as { from?: Location };
    if (state?.from && state.from.pathname) {
      const pathRole = state.from.pathname.split('/')[1];
      if (pathRole === role) {
        console.log("Redirecting to previous location:", state.from.pathname);
        return state.from.pathname;
      }
    }

    // Default to the role-specific dashboard
    const dashboardPath = `/${role}/dashboard`;
    console.log("Redirecting to default dashboard:", dashboardPath);
    return dashboardPath;
  };

  return { getRoleBasedRedirect };
};
