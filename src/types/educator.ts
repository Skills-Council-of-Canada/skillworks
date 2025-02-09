
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
  title: string;
  description: string;
  start_date: string;
  end_date: string | null;
  status: 'active' | 'completed' | 'cancelled';
  trade_category: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  employer_id: string | null;
  required_certifications: string[];
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

