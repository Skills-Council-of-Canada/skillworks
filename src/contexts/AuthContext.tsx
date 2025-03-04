
import { createContext, useContext, FC, ReactNode, useEffect, useRef } from "react";
import { AuthContextType } from "@/types/auth";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthOperations } from "@/hooks/useAuthOperations";
import { Toaster } from "@/components/ui/toaster";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isLoading, setIsLoading } = useAuthState();
  const { login, logout, signup } = useAuthOperations(setIsLoading);
  const mounted = useRef(true);
  const loggedOnce = useRef(false);

  // Only log once when mounted or when user changes
  useEffect(() => {
    if (mounted.current && !loggedOnce.current && user !== undefined) {
      console.log("AuthProvider mounted, user:", user ? "authenticated" : "null");
      loggedOnce.current = true;
      mounted.current = false;
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};
