
export interface Project {
  id: string;
  title: string;
  status: "active" | "draft" | "completed";
  trade_type: string;
  description: string;
  start_date?: string;
  end_date?: string;
  location_type?: string;
  site_address?: string;
  positions?: number;
  skill_level?: string;
  applications_count?: number;
}
