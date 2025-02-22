
import { UserRole } from "@/types/auth";
import { useLocation } from "react-router-dom";

export const useAuthRedirect = () => {
  const location = useLocation();

  const getRoleBasedRedirect = (role: UserRole): string => {
    console.log("Getting redirect path for role:", role);
    
    // If we have a 'from' location state, verify it matches the user's role
    const state = location.state as { from?: Location };
    if (state?.from && state.from.pathname) {
      const pathRole = state.from.pathname.split('/')[1];
      if (pathRole === role) {
        console.log("Redirecting to previous location:", state.from.pathname);
        return state.from.pathname;
      }
    }

    // Always redirect to the role-specific dashboard
    const dashboardPaths: Record<UserRole, string> = {
      admin: "/admin/dashboard",
      educator: "/educator/dashboard",
      employer: "/employer/dashboard",
      participant: "/participant/dashboard"
    };

    console.log(`Redirecting ${role} to default dashboard:`, dashboardPaths[role]);
    return dashboardPaths[role];
  };

  return { getRoleBasedRedirect };
};
