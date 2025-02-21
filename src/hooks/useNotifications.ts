
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  content: string;
  category: 'project_request' | 'project_match' | 'submission_update' | 'review_reminder' | 'message_alert' | 'milestone_alert' | 'system';
  priority: 'critical' | 'important' | 'general';
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
  action_url?: string;
  action_text?: string;
  metadata: Record<string, any>;
}

interface DatabaseNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  [key: string]: any;
}

export const useNotifications = (filters?: {
  category?: string;
  priority?: string;
  is_read?: boolean;
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications', filters],
    queryFn: async () => {
      const query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      const filteredQuery = Object.entries(filters || {}).reduce((q, [key, value]) => {
        if (value !== undefined) {
          return q.eq(key === 'is_read' ? 'read' : key, value);
        }
        return q;
      }, query);

      const { data, error } = await filteredQuery;
      if (error) throw error;
      
      return (data as DatabaseNotification[] || []).map(n => ({
        id: n.id,
        title: n.title,
        content: n.message || '',
        category: n.type as Notification['category'],
        priority: 'general' as const,
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
