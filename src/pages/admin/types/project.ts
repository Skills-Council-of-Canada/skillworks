
export type ProjectReviewStatus = "pending" | "approved" | "rejected" | "needs_modification";

export interface Project {
  id: string;
  title: string;
  description: string;
  review_status: ProjectReviewStatus;
  created_at: string;
  updated_at: string;
}
