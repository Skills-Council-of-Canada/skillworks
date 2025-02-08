
import React, { createContext, useContext, useState } from "react";
import { AuthContextType, User, UserRole } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock login function - replace with real authentication later
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data - replace with real authentication
      const mockUser: User = {
        id: "1",
        email,
        role: determineUserRole(email),
        name: "John Doe",
      };

      setUser(mockUser);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper function to determine user role from email
const determineUserRole = (email: string): UserRole => {
  if (email.includes("admin")) return "admin";
  if (email.includes("educator")) return "educator";
  if (email.includes("employer")) return "employer";
  return "participant";
};
