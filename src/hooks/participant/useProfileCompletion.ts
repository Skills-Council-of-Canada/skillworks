
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

      const { data, error } = await supabase
        .from("participant_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
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
      if (!user?.id || !profile) return;

      const completionPercentage = calculateCompletionPercentage(profile);

      const { error } = await supabase
        .from('participant_profiles')
        .update({ 
          profile_completion_percentage: completionPercentage,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      return completionPercentage;
    },
    onSuccess: (completionPercentage) => {
      queryClient.invalidateQueries({ queryKey: ["participant-profile"] });
      toast({
        title: "Profile Updated",
        description: `Profile completion: ${completionPercentage}%`,
      });
    },
    onError: () => {
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
