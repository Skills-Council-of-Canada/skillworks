
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

  // Use type-safe query with proper caching
  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return profile as CombinedProfile;
    },
    enabled: Boolean(user?.id),
    staleTime: Infinity, // Keep data fresh indefinitely since we're using websockets for updates
    cacheTime: 30 * 60 * 1000, // Cache for 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const calculateCompletionPercentage = useMemo(() => {
    if (!profileData) return 0;

    const requiredFields = [
      'name',
      'email',
      'phone',
      'bio',
      'avatar_url'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = profileData[field as keyof CombinedProfile];
      return value !== null && value !== undefined && value !== '';
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  }, [profileData]);

  return {
    profile: profileData,
    isLoading,
    completionPercentage: calculateCompletionPercentage,
  };
};
