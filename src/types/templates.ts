
export interface ExperienceTemplate {
  id: string;
  experience_id: string;
  title: string;
  description: string;
  trade_type: string;
  skill_level: string;
  created_at: string;
  metadata: {
    expected_outcomes: string[];
    subcategories: string[];
    skill_tags: string[];
    duration_weeks: number;
    team_size: number;
    milestones: any[];
  };
  status: 'active' | 'inactive';
  is_public: boolean;
  educator_id: string;
}
