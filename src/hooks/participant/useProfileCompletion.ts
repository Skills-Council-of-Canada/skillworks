
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ParticipantProfile {
  id: string;
  email: string;
  full_name: string;
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

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["participant-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      console.log("Fetching participant profile data for user:", user.id);
      
      // Fetch both profile and participant details
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      const { data: details, error: detailsError } = await supabase
        .from("participant_details")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

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
      };
    },
    enabled: !!user?.id,
    staleTime: 30000,
    retry: 1,
    onError: (error) => {
      console.error("Error in profile query:", error);
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        variant: "destructive",
      });
    },
  });

  const calculateCompletionPercentage = (profile: any) => {
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
      const value = profile[field];
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
