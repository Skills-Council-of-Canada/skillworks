
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
  skill_level?: string;
  availability?: string;
  educational_background?: string | null;
  preferred_learning_areas?: string[];
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
        const { data: participantDetails, error: detailsError } = await supabase
          .from('participant_profiles')
          .select('skill_level, availability, educational_background, preferred_learning_areas')
          .eq('id', user.id)
          .maybeSingle();

        if (detailsError && detailsError.code !== 'PGRST116') {
          console.error("Error fetching participant profile:", detailsError);
          return null;
        }

        // Combine only the fields we need
        const combinedProfile: CombinedProfile = {
          ...user,
          skill_level: participantDetails?.skill_level || undefined,
          availability: participantDetails?.availability || undefined,
          educational_background: participantDetails?.educational_background || null,
          preferred_learning_areas: participantDetails?.preferred_learning_areas || []
        };

        return combinedProfile;
      } catch (error) {
        console.error("Unexpected error:", error);
        return null;
      }
    },
    enabled: !!user?.id,
    staleTime: Infinity, // Never goes stale automatically
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false // Don't retry failed requests
  });

  const calculateCompletionPercentage = (profile: CombinedProfile | null) => {
    if (!profile) return 0;

    const requiredFields = [
      'name',
      'email',
      'phone',
      'skill_level',
      'availability',
      'preferred_learning_areas',
      'educational_background'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = profile[field as keyof CombinedProfile];
      return value !== null && value !== undefined && 
             (Array.isArray(value) ? value.length > 0 : value !== '');
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  return {
    profile: profileData,
    isLoading,
    completionPercentage: profileData ? calculateCompletionPercentage(profileData) : 0,
  };
};
