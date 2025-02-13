
export type ParticipantRegistrationStatus = "pending" | "email_verified" | "profile_completed" | "admin_approved" | "active";
export type MentorshipMode = 'self_guided' | 'mentor_assisted';
export type WorkVisibility = 'mentor' | 'public' | 'private';
export type ProfileVisibility = 'public' | 'private';

export interface ParticipantWorkflowStatus {
  id: string;
  participant_id: string;
  registration_status: ParticipantRegistrationStatus;
  needs_admin_review: boolean;
  last_status_change: string;
  created_at: string;
  updated_at: string;
}

export interface ParticipantIntegrations {
  id: string;
  participant_id: string;
  google_calendar_connected: boolean;
  google_oauth_token?: any;
  linkedin_oauth_token?: any;
  created_at: string;
  updated_at: string;
}

export interface ParticipantAchievement {
  id: string;
  participant_id: string;
  title: string;
  description?: string;
  type: 'badge' | 'certification' | 'achievement';
  issued_at: string;
  issuer?: string;
  badge_url?: string;
  metadata?: any;
  created_at: string;
}

export interface ParticipantPrivacySettings {
  work_visibility: WorkVisibility;
  profile_visibility: ProfileVisibility;
}

export interface ParticipantNotificationPreferences {
  mentor_feedback: boolean;
  project_approvals: boolean;
  experience_milestones: boolean;
}

export interface ParticipantSettings {
  id: string;
  participant_id: string;
  mentorship_mode: MentorshipMode;
  privacy_settings: ParticipantPrivacySettings;
  notification_preferences: ParticipantNotificationPreferences;
  created_at?: string;
  updated_at?: string;
}

export type UpdateParticipantSettings = Partial<Omit<ParticipantSettings, 'id' | 'participant_id' | 'created_at' | 'updated_at'>>;

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
}

export interface ParticipantProfile {
  id: string;
  user: User;
  achievements: ParticipantAchievement[];
  integrations: ParticipantIntegrations;
  workflow_status: ParticipantWorkflowStatus;
  uploaded_files: UploadedFile[];
}
