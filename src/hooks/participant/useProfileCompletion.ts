
import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";

export interface CombinedProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar_url?: string | null;
  bio?: string | null;
  phone?: string | null;
  preferred_contact?: string | null;
  created_at?: string;
  updated_at?: string;
  status?: string;
}

export const useProfileCompletion = () => {
  const { user, isLoading } = useAuth();

  const completionPercentage = useMemo(() => {
    if (!user) return 0;

    const requiredFields = ['name', 'email', 'phone', 'bio', 'avatar_url'];
    const completedFields = requiredFields.filter(field => {
      const value = user[field as keyof typeof user];
      return value !== null && value !== undefined && value !== '';
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  }, [user]);

  return { completionPercentage };
};
