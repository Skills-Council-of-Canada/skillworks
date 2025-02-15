
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["participant-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      console.log("Fetching profile for user:", user.id);
      
      const { data, error } = await supabase
        .from("participant_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive",
        });
        return null;
      }

      if (!data) {
        console.log("No profile found, creating new profile");
        const { data: newProfile, error: createError } = await supabase
          .from("participant_profiles")
          .insert([
            {
              id: user.id,
              email_verified: false,
              profile_completion_percentage: 0,
              steps_completed: {
                profile_setup: false,
                personal_details: false,
                skills_preferences: false,
                documents: false,
                final_review: false
              }
            }
          ])
          .select("*")
          .maybeSingle();

        if (createError) {
          console.error("Error creating profile:", createError);
          toast({
            title: "Error",
            description: "Failed to create profile",
            variant: "destructive",
          });
          return null;
        }

        console.log("New profile created:", newProfile);
        return newProfile;
      }

      console.log("Existing profile found:", data);
      return data;
    },
    enabled: !!user?.id,
    staleTime: 30000, // Consider data fresh for 30 seconds
    retry: 1,
  });

  const calculateCompletionPercentage = (profile: any) => {
    if (!profile) return 0;

    const requiredFields = [
      'full_name',
      'avatar_url',
      'bio',
      'location',
      'skills',
      'interests'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = profile[field];
      return value !== null && value !== undefined && 
             (Array.isArray(value) ? value.length > 0 : value !== '');
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const updateProfileCompletion = useMutation({
    mutationFn: async () => {
      if (!user?.id || !profile) {
        console.log("Cannot update profile: missing user ID or profile data");
        return;
      }

      const completionPercentage = calculateCompletionPercentage(profile);
      console.log("Updating profile completion to:", completionPercentage);

      const { error } = await supabase
        .from('participant_profiles')
        .update({ 
          profile_completion_percentage: completionPercentage,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error updating profile completion:", error);
        throw error;
      }
      return completionPercentage;
    },
    onSuccess: (completionPercentage) => {
      queryClient.invalidateQueries({ queryKey: ["participant-profile"] });
      if (completionPercentage !== undefined) {
        toast({
          title: "Profile Updated",
          description: `Profile completion: ${completionPercentage}%`,
        });
      }
    },
    onError: (error) => {
      console.error("Profile update error:", error);
      toast({
        title: "Error",
        description: "Failed to update profile completion",
        variant: "destructive",
      });
    },
  });

  return {
    profile,
    isLoading,
    completionPercentage: profile ? calculateCompletionPercentage(profile) : 0,
    updateProfileCompletion,
  };
};
