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
  status: 'draft' | 'pending_approval' | 'published';
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

export interface ExperienceFormValues {
  title: string;
  description: string;
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
}
