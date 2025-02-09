export interface EducatorTask {
  id: string;
  title: string;
  description: string;
  due_date: string | null;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  type: 'assessment' | 'employer_request' | 'other';
  created_at: string;
}

export interface EducatorEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  type: 'site_visit' | 'safety_training' | 'other';
  created_at: string;
}

export interface EducatorExperience {
  id: string;
  unique_code: string;
  educator_id: string;
  title: string;
  description: string;
  trade_category: string;
  subcategories: string[];
  skill_tags: string[];
  class_size: number;
  team_size: number;
  start_date: string;
  end_date: string | null;
  status: 'incomplete' | 'draft' | 'pending_approval' | 'published';
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  employer_id: string | null;
  required_certifications: string[];
  preferred_industries: string[];
  company_types: string[];
  compensation_type: string | null;
  screening_questions: Array<{
    question: string;
    required: boolean;
  }>;
  employer_approved: boolean;
  created_at: string;
  marketplace_visibility: 'private' | 'public' | 'invite_only';
  is_published: boolean;
  published_at: string | null;
}

export interface ExperienceMilestone {
  id: string;
  experience_id: string;
  title: string;
  description: string | null;
  due_date: string;
  created_at: string;
}

export interface ExperienceAssignment {
  id: string;
  experience_id: string;
  student_id: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  assigned_at: string;
  created_at: string;
}

export interface Milestone {
  title: string;
  description: string;
  due_date: string;
}

export interface ExperienceFormValues {
  title: string;
  description: string;
  expected_outcomes: string[];
  example_projects: {
    title: string;
    description: string;
  }[];
  media: File[];
  trade_category: string;
  subcategories: string[];
  skill_tags: string[];
  class_size: number;
  team_size: number;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  required_certifications?: string[];
  preferred_industries?: string[];
  company_types?: string[];
  compensation_type?: string;
  screening_questions?: Array<{
    question: string;
    required: boolean;
  }>;
  program_type: 'diploma' | 'certificate' | 'bachelors';
  team_structure: 'individual' | 'team';
  matching_type: 'admin' | 'self';
  start_date: string;
  end_date: string;
  milestones: Milestone[];
  marketplace_visibility?: 'private' | 'public' | 'invite_only';
}

export interface EducatorRegistrationData {
  fullName: string;
  institutionName: string;
  specialization: string;
  yearsExperience: number;
  jobTitle?: string;
  location?: string;  
  phoneNumber?: string;
  areasOfInterest?: string[];
  email: string;
  preferredContact: 'email' | 'phone';
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface SmsVerificationData {
  userId: string;
  phoneNumber: string;
  code: string;
}

export interface ExperienceTeam {
  id: string;
  experience_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExperienceTeamMember {
  id: string;
  team_id: string;
  student_id: string;
  role: string | null;
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface ExperienceCoEducator {
  id: string;
  experience_id: string;
  educator_id: string;
  role: string;
  permissions: {
    can_invite_students?: boolean;
    can_manage_teams?: boolean;
    can_post_updates?: boolean;
    can_manage_settings?: boolean;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface ExperienceUpdate {
  id: string;
  experience_id: string;
  author_id: string;
  title: string;
  content: string;
  visibility: 'all' | 'learners' | 'employers';
  media_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface ExperienceSettings {
  id: string;
  experience_id: string;
  notification_preferences: {
    email: boolean;
    push: boolean;
  };
  auto_approve_requests: boolean;
  visibility_settings: Record<string, boolean>;
  created_at: string;
  updated_at: string;
}

export interface ExperienceManagementProps {
  experienceId: string;
}
