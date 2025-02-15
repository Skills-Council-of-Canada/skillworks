
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ParticipantSettings, UpdateParticipantSettings } from "@/types/participant";
import { Database } from "@/types/supabase";

type ParticipantSettingsRow = Database['public']['Tables']['participant_settings']['Row'];

export const useParticipantSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["participant-settings"],
    queryFn: async () => {
      if (!user?.id) throw new Error("No user ID");

      const { data, error } = await supabase
        .from("participant_settings")
        .select("*")
        .eq("participant_id", user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No settings found, create default settings
          const defaultSettings: Omit<ParticipantSettings, 'id'> = {
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

          if (insertError) throw insertError;
          return newSettings as ParticipantSettings;
        }
        throw error;
      }

      return data as ParticipantSettings;
    },
    enabled: !!user?.id,
  });

  const { mutate: updateSettings } = useMutation({
    mutationFn: async (updates: UpdateParticipantSettings) => {
      if (!user?.id) throw new Error("No user ID");

      const { error } = await supabase
        .from("participant_settings")
        .update(updates)
        .eq("participant_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant-settings"] });
    },
  });

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
