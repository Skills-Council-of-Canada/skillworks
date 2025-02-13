
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ParticipantSettings } from "@/types/participant";
import { Database } from "@/integrations/supabase/types";

type DbParticipantSettings = Database['public']['Tables']['participant_settings']['Row'];

export const useParticipantSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const defaultSettings: DbParticipantSettings = {
    id: '',
    participant_id: user?.id || '',
    mentorship_mode: 'self_guided',
    privacy_settings: {
      work_visibility: 'mentor',
      profile_visibility: 'public',
    },
    notification_preferences: {
      mentor_feedback: true,
      project_approvals: true,
      experience_milestones: true,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
      
      return (data || defaultSettings) as DbParticipantSettings;
    },
    enabled: !!user?.id,
  });

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (newSettings: Partial<Omit<DbParticipantSettings, 'id' | 'created_at' | 'updated_at'>>) => {
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
