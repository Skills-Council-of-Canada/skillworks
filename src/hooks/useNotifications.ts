
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

type NotificationFilters = {
  category?: string;
  priority?: string;
  is_read?: boolean;
};

export const useNotifications = (filters?: NotificationFilters) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications', filters],
    queryFn: async () => {
      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters?.is_read !== undefined) {
        query = query.eq('read', filters.is_read);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Transform the data to match our Notification interface
      return (data || []).map(n => ({
        ...n,
        is_read: n.read || false,
        is_archived: false, // Default value since it's not in the DB yet
        content: n.message || '',
        category: n.type as Notification['category'],
        priority: 'general' as const, // Default value since it's not in the DB yet
        metadata: {} // Default value since it's not in the DB yet
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
