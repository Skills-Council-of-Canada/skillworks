
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ParticipantSettings, UpdateParticipantSettings } from "@/types/participant";

export const useParticipantSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const defaultSettings: Omit<ParticipantSettings, 'id'> = {
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
      if (!user?.id) {
        console.log("No user ID found, returning default settings");
        return { id: "", ...defaultSettings };
      }

      console.log("Fetching settings for user:", user.id);
      const response = await supabase
        .from("participant_settings")
        .select()
        .eq("participant_id", user.id)
        .single();

      if (response.error) {
        console.error("Database error:", response.error);
        throw response.error;
      }

      if (!response.data) {
        // If no settings exist, create default settings
        const insertResponse = await supabase
          .from("participant_settings")
          .insert({
            participant_id: user.id,
            mentorship_mode: defaultSettings.mentorship_mode,
            privacy_settings: defaultSettings.privacy_settings,
            notification_preferences: defaultSettings.notification_preferences,
          })
          .select()
          .single();

        if (insertResponse.error) {
          console.error("Error creating default settings:", insertResponse.error);
          throw insertResponse.error;
        }

        return {
          id: insertResponse.data.id,
          participant_id: insertResponse.data.participant_id,
          mentorship_mode: insertResponse.data.mentorship_mode,
          privacy_settings: insertResponse.data.privacy_settings as ParticipantSettings['privacy_settings'],
          notification_preferences: insertResponse.data.notification_preferences as ParticipantSettings['notification_preferences'],
        } as ParticipantSettings;
      }

      return {
        id: response.data.id,
        participant_id: response.data.participant_id,
        mentorship_mode: response.data.mentorship_mode,
        privacy_settings: response.data.privacy_settings as ParticipantSettings['privacy_settings'],
        notification_preferences: response.data.notification_preferences as ParticipantSettings['notification_preferences'],
      } as ParticipantSettings;
    },
    enabled: !!user?.id,
  });

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (newSettings: UpdateParticipantSettings) => {
      if (!user?.id) {
        throw new Error("No user ID found");
      }

      const response = await supabase
        .from("participant_settings")
        .upsert({
          participant_id: user.id,
          mentorship_mode: newSettings.mentorship_mode,
          privacy_settings: newSettings.privacy_settings,
          notification_preferences: newSettings.notification_preferences,
        })
        .select()
        .single();

      if (response.error) {
        console.error("Error updating settings:", response.error);
        throw response.error;
      }

      return {
        id: response.data.id,
        participant_id: response.data.participant_id,
        mentorship_mode: response.data.mentorship_mode,
        privacy_settings: response.data.privacy_settings as ParticipantSettings['privacy_settings'],
        notification_preferences: response.data.notification_preferences as ParticipantSettings['notification_preferences'],
      } as ParticipantSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant-settings"] });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error in mutation:", error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    },
  });

  return {
    settings: settings || { id: "", ...defaultSettings },
    updateSettings,
    isLoading,
  };
};
