
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
          return { id: "", ...defaultSettings };
        }

        const { data, error } = await supabase
          .from("participant_settings")
          .select("*")
          .eq("participant_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching settings:", error);
          throw error;
        }

        // If no data found, return default settings
        if (!data) {
          return { id: "", ...defaultSettings };
        }

        return data as unknown as ParticipantSettings;
      } catch (error) {
        console.error("Error in settings query:", error);
        return { id: "", ...defaultSettings };
      }
    },
    // Only run the query if we have a user ID
    enabled: true,
    // Add staleTime to prevent unnecessary refetches
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Add retry configuration
    retry: 1,
  });

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (newSettings: Partial<Omit<ParticipantSettings, "id" | "participant_id">>) => {
      if (!user?.id) throw new Error("No user ID found");

      const updatedSettings = {
        participant_id: user.id,
        ...newSettings,
      };

      const { error } = await supabase
        .from("participant_settings")
        .upsert(updatedSettings)
        .select()
        .maybeSingle();

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
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    },
  });

  return {
    settings: settings as ParticipantSettings,
    updateSettings,
    isLoading,
  };
};
