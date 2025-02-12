
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ParticipantSettings } from "@/types/participant";
import { Database } from "@/types/supabase";

export const useParticipantSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery<ParticipantSettings | null>({
    queryKey: ["participant-settings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("participant_settings")
        .select()
        .eq("participant_id", user?.id)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        // Return default settings if none exist
        return {
          id: "",
          participant_id: user?.id || "",
          mentorship_mode: "self_guided" as const,
          privacy_settings: {
            work_visibility: "mentor" as const,
            profile_visibility: "public" as const,
          },
          notification_preferences: {
            mentor_feedback: true,
            project_approvals: true,
            experience_milestones: true,
          }
        };
      }
      
      return data as ParticipantSettings;
    },
    enabled: !!user?.id,
  });

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (newSettings: Partial<ParticipantSettings>) => {
      const updatedSettings = {
        participant_id: user?.id,
        ...newSettings,
      };

      const { error } = await supabase
        .from("participant_settings")
        .upsert(updatedSettings)
        .eq('participant_id', user?.id);

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
