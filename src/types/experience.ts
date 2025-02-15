
export interface Experience {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date?: string;
  trade_category?: string;
  subcategories?: string[];
  skill_tags?: string[];
  expected_outcomes?: string[];
  project_examples?: any[];
  learner_capabilities?: string;
  media_urls?: string[];
  video_url?: string;
  team_structure?: string;
  team_size?: number;
  preferred_companies?: any;
  duration_hours?: number;
  learner_level?: string;
  max_learners?: number;
  educator: {
    name: string;
  };
  milestones: Array<{
    id: string;
    title: string;
    due_date: string;
    status: string;
  }>;
  feedback: Array<{
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    reviewer: {
      name: string;
    };
  }>;
}

export interface RawSupabaseResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string | null;
  educator: { name: string }[];
  milestones: {
    id: string;
    title: string;
    due_date: string;
    status: string;
  }[];
  feedback: {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    reviewer: { name: string }[];
  }[];
}
