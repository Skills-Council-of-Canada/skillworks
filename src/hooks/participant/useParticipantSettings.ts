
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ParticipantSettings, UpdateParticipantSettings } from "@/types/participant";
import { Database } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";

type ParticipantSettingsRow = Database['public']['Tables']['participant_settings']['Row'];
type DbInsertSettings = Database['public']['Tables']['participant_settings']['Insert'];

const RETRY_COUNT = 3;
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useParticipantSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["participant-settings"],
    queryFn: async () => {
      if (!user?.id) throw new Error("No user ID");

      let retries = 0;
      while (retries < RETRY_COUNT) {
        try {
          const { data, error } = await supabase
            .from("participant_settings")
            .select("*")
            .eq("participant_id", user.id)
            .single();

          if (error) {
            if (error.code === 'PGRST116') {
              // No settings found, create default settings
              const defaultSettings: DbInsertSettings = {
                participant_id: user.id,
                mentorship_mode: "self_guided",
                privacy_settings: {
                  work_visibility: "mentor",
                  profile_visibility: "public",
                  profile_indexing: "public"
                },
                notification_preferences: {
                  mentor_feedback: true,
                  project_approvals: true,
                  experience_milestones: true,
                  match_requests: true,
                  match_comments: true,
                  matched_projects: true,
                  experience_updates: true,
                  feedback_reminders: true,
                  company_applications: true,
                  date_changes: true,
                  new_feedback: true,
                  member_requests: true,
                  account_merge: true
                },
                language_preference: "en",
                timezone: "UTC",
                appearance_settings: {
                  cover_photo_url: null,
                  banner_color: "#000000",
                  use_default_settings: true
                },
                digest_settings: {
                  email_frequency: "daily",
                  disable_all_emails: false,
                  disable_all_sms: false
                },
                security_settings: {
                  mfa_enabled: false,
                  last_password_change: null,
                  account_merged: false
                }
              };

              const { data: newSettings, error: insertError } = await supabase
                .from("participant_settings")
                .insert(defaultSettings)
                .select()
                .single();

              if (insertError) {
                if (retries < RETRY_COUNT - 1) {
                  retries++;
                  continue;
                }
                throw insertError;
              }
              
              return transformDatabaseToAppSettings(newSettings as ParticipantSettingsRow);
            }
            throw error;
          }

          return transformDatabaseToAppSettings(data as ParticipantSettingsRow);
        } catch (error) {
          if (retries < RETRY_COUNT - 1) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, 1000 * (retries + 1)));
            continue;
          }
          throw error;
        }
      }
    },
    enabled: !!user?.id,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  const { mutate: updateSettings } = useMutation({
    mutationFn: async (updates: UpdateParticipantSettings) => {
      if (!user?.id) throw new Error("No user ID");

      const dbUpdates: Partial<DbInsertSettings> = {
        mentorship_mode: updates.mentorship_mode,
        language_preference: updates.language_preference,
        timezone: updates.timezone,
        privacy_settings: updates.privacy_settings,
        notification_preferences: updates.notification_preferences,
        appearance_settings: updates.appearance_settings,
        digest_settings: updates.digest_settings,
        security_settings: updates.security_settings
      };

      let retries = 0;
      while (retries < RETRY_COUNT) {
        try {
          const { error } = await supabase
            .from("participant_settings")
            .update(dbUpdates)
            .eq("participant_id", user.id);

          if (error) throw error;
          break;
        } catch (error) {
          if (retries < RETRY_COUNT - 1) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, 1000 * (retries + 1)));
            continue;
          }
          throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant-settings"] });
      toast({
        title: "Settings updated",
        description: "Your settings have been successfully updated.",
      });
    },
    onError: (error) => {
      console.error("Failed to update settings:", error);
      toast({
        title: "Error updating settings",
        description: "There was a problem updating your settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  function transformDatabaseToAppSettings(data: ParticipantSettingsRow): ParticipantSettings {
    return {
      id: data.id,
      participant_id: data.participant_id,
      mentorship_mode: data.mentorship_mode,
      privacy_settings: data.privacy_settings as Required<ParticipantSettings['privacy_settings']>,
      notification_preferences: data.notification_preferences as Required<ParticipantSettings['notification_preferences']>,
      language_preference: data.language_preference,
      timezone: data.timezone,
      appearance_settings: data.appearance_settings as Required<ParticipantSettings['appearance_settings']>,
      digest_settings: data.digest_settings as Required<ParticipantSettings['digest_settings']>,
      security_settings: data.security_settings as Required<ParticipantSettings['security_settings']>,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  }

  return {
    settings: settings || {
      id: "",
      participant_id: user?.id || "",
      mentorship_mode: "self_guided",
      privacy_settings: {
        work_visibility: "mentor",
        profile_visibility: "public",
        profile_indexing: "public"
      },
      notification_preferences: {
        mentor_feedback: true,
        project_approvals: true,
        experience_milestones: true,
        match_requests: true,
        match_comments: true,
        matched_projects: true,
        experience_updates: true,
        feedback_reminders: true,
        company_applications: true,
        date_changes: true,
        new_feedback: true,
        member_requests: true,
        account_merge: true
      },
      language_preference: "en",
      timezone: "UTC",
      appearance_settings: {
        cover_photo_url: null,
        banner_color: "#000000",
        use_default_settings: true
      },
      digest_settings: {
        email_frequency: "daily",
        disable_all_emails: false,
        disable_all_sms: false
      },
      security_settings: {
        mfa_enabled: false,
        last_password_change: null,
        account_merged: false
      }
    },
    updateSettings,
    isLoading,
  };
};
