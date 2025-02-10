
export type NotificationLevel = 'all' | 'important' | 'critical' | 'none';
export type VisibilityRule = 'public' | 'registered' | 'verified' | 'admin_approved';

export interface SystemSetting {
  id: string;
  category: string;
  key: string;
  value: any;
  description: string;
  requires_approval: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SettingsChangeRequest {
  id: string;
  setting_id: string;
  old_value: any;
  new_value: any;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  review_notes?: string;
  created_at: string;
  updated_at: string;
}
