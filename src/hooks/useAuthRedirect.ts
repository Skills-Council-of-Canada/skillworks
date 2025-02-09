
import { UserRole } from "@/types/auth";

export const useAuthRedirect = () => {
  const getRoleBasedRedirect = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return "/admin";
      case "employer":
        return "/employer";
      case "educator":
        return "/educator";
      case "participant":
        return "/participant";
      default:
        return "/login";
    }
  };

  return { getRoleBasedRedirect };
};
