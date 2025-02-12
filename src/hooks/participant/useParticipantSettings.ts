
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type ParticipantSettings = {
  id: string;
  participant_id: string;
  mentorship_mode: 'self_guided' | 'mentor_led';
  privacy_settings: {
    work_visibility: 'mentor' | 'public' | 'private';
    profile_visibility: 'public' | 'private';
  };
  notification_preferences: {
    mentor_feedback: boolean;
    project_approvals: boolean;
    experience_milestones: boolean;
  };
};

export const useParticipantSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const defaultSettings: ParticipantSettings = {
    id: "",
    participant_id: user?.id || "",
    mentorship_mode: "self_guided",
    privacy_settings: {
      work_visibility: "mentor",
      profile_visibility: "public",
    },
    notification_preferences: {
      mentor_feedback: true,
      project_approvals: true,
      experience_milestones: true,
    }
  };

  const { data: settings, isLoading } = useQuery({
    queryKey: ["participant-settings", user?.id],
    queryFn: async () => {
      if (!user?.id) return defaultSettings;

      const { data, error } = await supabase
        .from('participant_settings')
        .select('*')
        .eq('participant_id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      return data ? (data as ParticipantSettings) : defaultSettings;
    },
    enabled: !!user?.id,
  });

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (newSettings: Partial<ParticipantSettings>) => {
      if (!user?.id) throw new Error("No user ID found");

      const updatedSettings = {
        participant_id: user.id,
        ...newSettings,
      };

      const { error } = await supabase
        .from('participant_settings')
        .upsert(updatedSettings);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant-settings"] });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
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
