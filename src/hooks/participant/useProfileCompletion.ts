
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface Profile {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  status: string;
  phone: string | null;
  preferred_contact: string | null;
}

interface ParticipantDetails {
  id: string;
  skill_level: SkillLevel;
  availability: string;
  date_of_birth: string | null;
  educational_background: string | null;
  preferred_learning_areas: string[];
}

type CombinedProfile = {
  full_name: string;
} & Omit<Profile, 'name'> & Omit<ParticipantDetails, 'id'>;

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profileData, isLoading } = useQuery<CombinedProfile | null>({
    queryKey: ["participant-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      try {
        // First, get the base profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast({
            title: "Error",
            description: "Failed to fetch profile data",
            variant: "destructive",
          });
          return null;
        }

        if (!profile) {
          return null;
        }

        // Then get participant details
        const { data: details, error: detailsError } = await supabase
          .from('participant_details')
          .select()
          .eq('id', user.id)
          .maybeSingle();

        if (detailsError) {
          console.error("Error fetching participant details:", detailsError);
          // Only show error if it's not a "does not exist" error
          if (detailsError.code !== 'PGRST116') {
            toast({
              title: "Error",
              description: "Failed to fetch participant details",
              variant: "destructive",
            });
          }
        }

        // Create combined profile with defaults if details are missing
        const combinedProfile: CombinedProfile = {
          ...profile,
          full_name: profile.name,
          skill_level: (details?.skill_level as SkillLevel) || 'beginner',
          availability: details?.availability || 'flexible',
          date_of_birth: details?.date_of_birth || null,
          educational_background: details?.educational_background || null,
          preferred_learning_areas: details?.preferred_learning_areas || [],
        };

        return combinedProfile;
      } catch (error) {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
        return null;
      }
    },
    retry: false,
    staleTime: 30000,
  });

  const calculateCompletionPercentage = (profile: CombinedProfile | null) => {
    if (!profile) return 0;

    const requiredFields = [
      'full_name',
      'email',
      'phone',
      'skill_level',
      'availability',
      'date_of_birth',
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
