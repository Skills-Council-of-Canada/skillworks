
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ParticipantSettings, UpdateParticipantSettings } from "@/types/participant";

export const useParticipantSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["participant-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("participant_settings")
        .select("*")
        .eq("participant_id", user?.id)
        .single();

      if (error) throw error;

      // Transform the data to match our types
      const transformedData: ParticipantSettings = {
        id: data.id,
        participant_id: data.participant_id,
        mentorship_mode: data.mentorship_mode,
        privacy_settings: {
          work_visibility: data.privacy_settings.work_visibility,
          profile_visibility: data.privacy_settings.profile_visibility,
          profile_indexing: data.privacy_settings.profile_indexing
        },
        notification_preferences: {
          mentor_feedback: data.notification_preferences.mentor_feedback,
          project_approvals: data.notification_preferences.project_approvals,
          experience_milestones: data.notification_preferences.experience_milestones,
          match_requests: data.notification_preferences.match_requests,
          match_comments: data.notification_preferences.match_comments,
          matched_projects: data.notification_preferences.matched_projects,
          experience_updates: data.notification_preferences.experience_updates,
          feedback_reminders: data.notification_preferences.feedback_reminders,
          company_applications: data.notification_preferences.company_applications,
          date_changes: data.notification_preferences.date_changes,
          new_feedback: data.notification_preferences.new_feedback,
          member_requests: data.notification_preferences.member_requests,
          account_merge: data.notification_preferences.account_merge
        },
        language_preference: data.language_preference,
        timezone: data.timezone,
        appearance_settings: data.appearance_settings,
        digest_settings: data.digest_settings,
        security_settings: data.security_settings,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      return transformedData;
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
