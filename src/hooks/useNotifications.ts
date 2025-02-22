
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
  type: NotificationCategory;
  priority?: NotificationPriority;
  read: boolean;
  read_at?: string;
  created_at: string;
  user_id: string;
  experience_id?: string;
}

export interface Notification extends Omit<DatabaseNotification, 'type' | 'read'> {
  category: NotificationCategory;
  is_read: boolean;
  content?: string;
  priority: NotificationPriority;
}

export interface NotificationFilters {
  category?: NotificationCategory;
  priority?: NotificationPriority;
  is_read?: boolean;
}

const mapDatabaseToNotification = (dbNotification: DatabaseNotification): Notification => {
  return {
    ...dbNotification,
    category: dbNotification.type,
    is_read: dbNotification.read,
    content: dbNotification.message,
    priority: dbNotification.priority || 'general'
  };
};

export const useNotifications = (filters?: NotificationFilters) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications', filters?.category, filters?.priority, filters?.is_read],
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

      return (data as DatabaseNotification[] || []).map(mapDatabaseToNotification);
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
