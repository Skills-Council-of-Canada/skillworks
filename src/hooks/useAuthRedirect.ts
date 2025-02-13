
import { UserRole } from "@/types/auth";

export const useAuthRedirect = () => {
  const getRoleBasedRedirect = (role: UserRole): string => {
    console.log("Getting redirect path for role:", role);
    switch (role) {
      case "admin":
        return "/admin";
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
