
export interface Project {
  id: string;
  title: string;
  description: string;
  trade_type: string;
  location_type: string;
  project_type: string;
  industry: string;
  employer: {
    company_name: string;
    rating: number;
    rating_count: number;
  };
}
