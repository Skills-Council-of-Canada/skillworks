
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
      const { data, error } = await supabase
        .from("participant_settings")
        .select("*")
        .eq("participant_id", user?.id)
        .single();

      if (error) throw error;

      const row = data as ParticipantSettingsRow;

      // Transform the data to match our types
      const transformedData: ParticipantSettings = {
        id: row.id,
        participant_id: row.participant_id,
        mentorship_mode: row.mentorship_mode,
        privacy_settings: row.privacy_settings as ParticipantSettings['privacy_settings'],
        notification_preferences: row.notification_preferences as ParticipantSettings['notification_preferences'],
        language_preference: row.language_preference,
        timezone: row.timezone,
        appearance_settings: row.appearance_settings as ParticipantSettings['appearance_settings'],
        digest_settings: row.digest_settings as ParticipantSettings['digest_settings'],
        security_settings: row.security_settings as ParticipantSettings['security_settings'],
        created_at: row.created_at,
        updated_at: row.updated_at
      };

      return transformedData;
    },
    enabled: !!user?.id,
  });

  const { mutate: updateSettings } = useMutation({
    mutationFn: async (updates: UpdateParticipantSettings) => {
      if (!user?.id) throw new Error("No user ID");

      const updateData = {
        ...updates,
        privacy_settings: updates.privacy_settings as any,
        notification_preferences: updates.notification_preferences as any,
        appearance_settings: updates.appearance_settings as any,
        digest_settings: updates.digest_settings as any,
        security_settings: updates.security_settings as any,
      };

      const { error } = await supabase
        .from("participant_settings")
        .update(updateData)
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
