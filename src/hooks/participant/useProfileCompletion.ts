
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/supabase";

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
  const { toast } = useToast();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["participant-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      try {
        // Query participant profile data
        const { data: participantProfile, error: participantError } = await supabase
          .from('participant_profiles')
          .select('onboarding_completed, profile_completion_percentage')
          .eq('id', user.id)
          .maybeSingle();

        if (participantError) {
          console.error("Error fetching participant profile:", participantError);
          return null;
        }

        // Return combined profile
        const combinedProfile: CombinedProfile = {
          ...user,
        };

        return combinedProfile;
      } catch (error) {
        console.error("Unexpected error:", error);
        return null;
      }
    },
    enabled: !!user?.id,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false
  });

  const calculateCompletionPercentage = (profile: CombinedProfile | null) => {
    if (!profile) return 0;

    const requiredFields = [
      'name',
      'email',
      'phone'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = profile[field as keyof CombinedProfile];
      return value !== null && value !== undefined && value !== '';
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  return {
    profile: profileData,
    isLoading,
    completionPercentage: profileData ? calculateCompletionPercentage(profileData) : 0,
  };
};
