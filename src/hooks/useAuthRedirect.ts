
import { UserRole } from "@/types/auth";

export const useAuthRedirect = () => {
  const getRoleBasedRedirect = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "/admin";
      case "employer":
        return "/employer";  // This ensures employers go to /employer
      case "educator":
        return "/educator";
      case "participant":
        return "/dashboard";
      default:
        return "/";
    }
  };

  return { getRoleBasedRedirect };
};
