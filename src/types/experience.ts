
export interface Experience {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date?: string;
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
