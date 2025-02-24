
import { createContext, useContext, FC, ReactNode, useEffect } from "react";
import { AuthContextType } from "@/types/auth";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthOperations } from "@/hooks/useAuthOperations";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter } from "react-router-dom";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // Wrap the hook usage with BrowserRouter since useAuthState uses routing hooks
  return (
    <BrowserRouter>
      <AuthProviderContent>{children}</AuthProviderContent>
    </BrowserRouter>
  );
};

const AuthProviderContent: FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoading, setIsLoading } = useAuthState();
  const { login, logout, signup } = useAuthOperations(setIsLoading);

  useEffect(() => {
    console.log("AuthProvider mounted, user:", user);
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
