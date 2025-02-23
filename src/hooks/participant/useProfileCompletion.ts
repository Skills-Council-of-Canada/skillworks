
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

  const fetchProfile = useMemo(() => async () => {
    if (!user?.id) return null;

    const { data: participantProfile, error: participantError } = await supabase
      .from('participant_profiles')
      .select('onboarding_completed, profile_completion_percentage')
      .eq('id', user.id)
      .maybeSingle();

    if (participantError) {
      console.error("Error fetching participant profile:", participantError);
      return null;
    }

    const combinedProfile: CombinedProfile = {
      ...user,
    };

    return combinedProfile;
  }, [user?.id]);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["participant-profile", user?.id],
    queryFn: fetchProfile,
    enabled: Boolean(user?.id),
    staleTime: Infinity, // Prevent automatic refetching
    gcTime: 3600000, // Keep in cache for 1 hour
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    retry: false,
    refetchInterval: false
  });

  const calculateCompletionPercentage = useMemo(() => {
    if (!profileData) return 0;

    const requiredFields = [
      'name',
      'email',
      'phone'
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
