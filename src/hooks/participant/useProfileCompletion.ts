
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

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
  skill_level: string;
  availability: string;
  date_of_birth: string;
  educational_background: string | null;
  preferred_learning_areas: string[];
  created_at: string;
  updated_at: string;
}

interface CombinedProfile extends Profile, Omit<ParticipantDetails, 'id' | 'created_at' | 'updated_at'> {
  full_name: string;
}

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profileData, isLoading } = useQuery<CombinedProfile | null>({
    queryKey: ["participant-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      console.log("Fetching participant profile data for user:", user.id);
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      try {
        const { data: details, error: detailsError } = await supabase
          .from('participant_details')
          .select('*')
          .eq('id', user.id)
          .single();

        if (detailsError) {
          console.error("Error fetching participant details:", detailsError);
          throw detailsError;
        }

        if (!profile || !details) {
          toast({
            title: "Profile Incomplete",
            description: "Please complete your profile setup",
            variant: "destructive",
          });
          return null;
        }

        return {
          ...profile,
          ...details,
          full_name: profile.name, // Use name from profiles table as full_name
        };
      } catch (error) {
        console.error("Error in details fetch:", error);
        // Return basic profile if details aren't found yet
        return {
          ...profile,
          full_name: profile.name,
          skill_level: '',
          availability: '',
          date_of_birth: '',
          educational_background: null,
          preferred_learning_areas: [],
        };
      }
    },
    enabled: !!user?.id,
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
