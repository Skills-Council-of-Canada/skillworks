
export interface EmployerCollaboration {
  id: string;
  educator_id: string;
  employer_id: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  created_at: string;
  updated_at: string;
  employer?: {
    company_name: string;
    industry: string;
    location: string;
    logo_url?: string;
  };
}

export interface CollaborationMessage {
  id: string;
  collaboration_id: string;
  sender_id: string;
  content: string;
  read_at?: string;
  created_at: string;
}
