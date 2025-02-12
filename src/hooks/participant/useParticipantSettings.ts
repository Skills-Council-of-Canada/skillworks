
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ParticipantSettings {
  id: string;
  mentorship_mode: 'self_guided' | 'mentor_assisted';
  privacy_settings: {
    work_visibility: 'mentor' | 'employer' | 'public';
    profile_visibility: 'public' | 'private';
  };
  notification_preferences: {
    mentor_feedback: boolean;
    project_approvals: boolean;
    experience_milestones: boolean;
  };
}

export const useParticipantSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["participant-settings", user?.id],
    queryFn: async () => {
      const { data: settings, error } = await supabase
        .from("participant_settings")
        .select("*")
        .eq("participant_id", user?.id)
        .single();

      if (error) throw error;
      return settings as ParticipantSettings;
    },
    enabled: !!user?.id,
  });

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (newSettings: Partial<ParticipantSettings>) => {
      const { error } = await supabase
        .from("participant_settings")
        .upsert({
          participant_id: user?.id,
          ...newSettings,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant-settings"] });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    },
  });

  return {
    settings,
    updateSettings,
    isLoading,
  };
};
