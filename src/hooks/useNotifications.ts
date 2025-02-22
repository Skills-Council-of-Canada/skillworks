
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
  category: NotificationCategory;
  priority: NotificationPriority;
  is_read: boolean;
  read_at?: string;
  created_at: string;
  user_id: string;
  experience_id?: string;
  content?: string;
}

// This interface represents the actual structure from the database
interface RawNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  read_at: string | null;
  created_at: string;
  user_id: string;
  experience_id: string | null;
  content?: string | null;
  priority?: string;
}

interface NotificationFilters {
  category?: NotificationCategory;
  priority?: NotificationPriority;
  is_read?: boolean;
}

export const useNotifications = (filters?: NotificationFilters) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications', filters],
    queryFn: async () => {
      // Explicitly type the query to avoid deep instantiation
      const query = supabase
        .from('notifications')
        .select<string, RawNotification>('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      // Apply filters
      const filteredQuery = filters?.category 
        ? query.eq('type', filters.category)
        : query;

      const finalQuery = filters?.is_read !== undefined 
        ? filteredQuery.eq('read', filters.is_read)
        : filteredQuery;

      const { data, error } = await finalQuery;
      if (error) throw error;
      
      // Transform the raw data to match our expected types
      return (data || []).map(item => ({
        id: item.id,
        title: item.title,
        message: item.message,
        category: item.type as NotificationCategory,
        priority: (item.priority as NotificationPriority) || 'general',
        is_read: item.read,
        read_at: item.read_at || undefined,
        created_at: item.created_at,
        user_id: item.user_id,
        experience_id: item.experience_id || undefined,
        content: item.content || undefined
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
        variant: "default",
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
