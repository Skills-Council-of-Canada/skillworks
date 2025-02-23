
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/supabase";
import { useMemo } from "react";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];
type ParticipantProfile = Tables['participant_profiles']['Row'];

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
  const { user } = useAuth();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      return profile as CombinedProfile;
    },
    enabled: Boolean(user?.id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false
  });

  const completionPercentage = useMemo(() => {
    if (!profileData) return 0;

    const requiredFields = ['name', 'email', 'phone', 'bio', 'avatar_url'];
    const completedFields = requiredFields.filter(field => {
      const value = profileData[field as keyof CombinedProfile];
      return value !== null && value !== undefined && value !== '';
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  }, [profileData]);

  return {
    profile: profileData,
    isLoading,
    completionPercentage,
  };
};
