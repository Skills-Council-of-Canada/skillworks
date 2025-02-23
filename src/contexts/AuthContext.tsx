
import * as React from "react";
import { AuthContextType } from "@/types/auth";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthOperations } from "@/hooks/useAuthOperations";

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, setIsLoading } = useAuthState();
  const { login, logout, signup } = useAuthOperations(setIsLoading);

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
    </AuthContext.Provider>
  );
};
