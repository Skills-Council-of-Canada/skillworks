
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type NotificationCategory = 'project_request' | 'project_match' | 'submission_update' | 
                          'review_reminder' | 'message_alert' | 'milestone_alert' | 'system';
export type NotificationPriority = 'critical' | 'important' | 'general';

interface DatabaseNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  read_at?: string;
  created_at: string;
  user_id: string;
  experience_id?: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
  action_url?: string;
  action_text?: string;
  metadata: Record<string, unknown>;
}

interface NotificationFilters {
  category?: NotificationCategory;
  priority?: NotificationPriority;
  is_read?: boolean;
}

const isValidNotificationCategory = (type: string): type is NotificationCategory => {
  return ['project_request', 'project_match', 'submission_update', 
          'review_reminder', 'message_alert', 'milestone_alert', 'system'].includes(type);
};

export const useNotifications = (filters?: NotificationFilters) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fix for TypeScript error by explicitly typing the query key
  const queryKey = ['notifications', 
    { category: filters?.category, 
      priority: filters?.priority, 
      is_read: filters?.is_read 
    }
  ] as const;

  const { data: notifications, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('type', filters.category);
      }
      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters?.is_read !== undefined) {
        query = query.eq('read', filters.is_read);
      }

      const { data, error } = await query;
      if (error) throw error;

      return (data || []).map((n: DatabaseNotification) => ({
        id: n.id,
        title: n.title,
        content: n.message || '',
        category: isValidNotificationCategory(n.type) ? n.type : 'system',
        priority: 'general' as NotificationPriority,
        is_read: n.read,
        is_archived: false,
        created_at: n.created_at,
        metadata: {}
      }));
    },
    enabled: !!user?.id,
  });

  const markAsRead = useMutation({
    mutationFn: async (notificationIds: string[]) => {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .in('id', notificationIds)
        .eq('user_id', user?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: "Success",
        description: "Notifications marked as read",
      });
    },
    onError: (error) => {
      console.error('Error marking notifications as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive",
      });
    },
  });

  return {
    notifications,
    isLoading,
    markAsRead,
  };
};
