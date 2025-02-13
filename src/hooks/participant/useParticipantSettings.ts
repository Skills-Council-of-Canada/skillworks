
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ParticipantSettings } from "@/types/participant";

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
      try {
        // If no user, return default settings immediately
        if (!user?.id) {
          console.log("No user ID found, returning default settings");
          return { id: "", ...defaultSettings };
        }

        console.log("Fetching settings for user:", user.id);
        const { data, error } = await supabase
          .from("participant_settings")
          .select("*")
          .eq("participant_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Database error:", error);
          throw error;
        }

        if (!data) {
          console.log("No settings found, returning default settings");
          return { id: "", ...defaultSettings };
        }

        console.log("Settings found:", data);
        return data as ParticipantSettings;
      } catch (error) {
        console.error("Error in settings query:", error);
        throw error;
      }
    },
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (newSettings: Partial<Omit<ParticipantSettings, "id" | "participant_id">>) => {
      if (!user?.id) {
        console.error("No user ID found during update");
        throw new Error("No user ID found");
      }

      console.log("Updating settings for user:", user.id, "with data:", newSettings);

      const updatedSettings = {
        participant_id: user.id,
        ...newSettings,
      };

      const { data, error } = await supabase
        .from("participant_settings")
        .upsert(updatedSettings)
        .select()
        .maybeSingle();

      if (error) {
        console.error("Error updating settings:", error);
        throw error;
      }

      console.log("Settings updated successfully:", data);
      return data;
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
