
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
  created_at: string;
}
