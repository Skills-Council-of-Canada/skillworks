
import { UserRole } from "@/types/auth";

export const useAuthRedirect = () => {
  const getRoleBasedRedirect = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "/dashboard";
      case "employer":
        return "/employer";
      case "educator":
        return "/educator";
      case "participant":
        return "/dashboard";
      default:
        return "/dashboard";
    }
  };

  return { getRoleBasedRedirect };
};
