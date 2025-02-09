
import { supabase } from "@/integrations/supabase/client";

export interface ExperienceSettings {
  id: string;
  experience_id: string;
  display_preferences?: {
    show_progress_bar?: boolean;
    show_completion_status?: boolean;
    show_deadline_reminders?: boolean;
  };
  communication_settings?: {
    allow_team_chat?: boolean;
    allow_direct_messages?: boolean;
    enable_announcements?: boolean;
  };
  access_control?: {
    require_approval?: boolean;
    max_participants?: number | null;
    allow_late_submissions?: boolean;
  };
  notification_preferences?: {
    email?: boolean;
    push?: boolean;
  };
  auto_approve_requests?: boolean;
  visibility_settings?: Record<string, boolean>;
}

export const loadExperienceSettings = async (experienceId: string): Promise<ExperienceSettings> => {
  const { data, error } = await supabase
    .from('experience_settings')
    .select('*')
    .eq('experience_id', experienceId)
    .maybeSingle();

  if (error) {
    console.error('Error loading experience settings:', error);
    throw error;
  }

  if (!data) {
    // Create default settings if none exist
    const { data: newSettings, error: createError } = await supabase
      .from('experience_settings')
      .insert({
        experience_id: experienceId,
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating default settings:', createError);
      throw createError;
    }

    return newSettings;
  }

  return data;
};

export const updateExperienceSettings = async ({
  experienceId,
  settings,
}: {
  experienceId: string;
  settings: Partial<ExperienceSettings>;
}): Promise<void> => {
  const { error } = await supabase
    .from('experience_settings')
    .update(settings)
    .eq('experience_id', experienceId);

  if (error) {
    console.error('Error updating experience settings:', error);
    throw error;
  }
};
