
export interface Experience {
  id: string;
  title: string;
  description: string;
  educator_id: string;
  created_at: string;
  trade_category: string;
  approval_status: 'pending_review' | 'approved' | 'rejected' | 'needs_modification';
  educator: {
    full_name: string;
    institution_name: string;
  };
}
