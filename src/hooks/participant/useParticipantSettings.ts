
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
          .insert(defaultSettings)
          .select()
          .single();

        if (insertResponse.error) {
          console.error("Error creating default settings:", insertResponse.error);
          throw insertResponse.error;
        }

        return insertResponse.data as ParticipantSettings;
      }

      return response.data as ParticipantSettings;
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
          ...newSettings,
        })
        .select()
        .single();

      if (response.error) {
        console.error("Error updating settings:", response.error);
        throw response.error;
      }

      return response.data;
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
