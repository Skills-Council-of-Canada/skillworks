
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type NotificationCategory = 
  | 'student_signup' 
  | 'progress_update' 
  | 'submission' 
  | 'feedback_request' 
  | 'classroom_activity' 
  | 'certification' 
  | 'system';

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

export const useNotifications = (filters?: {
  category?: NotificationCategory;
  priority?: NotificationPriority;
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

      if (filters?.category) {
        query.eq('category', filters.category);
      }
      
      if (filters?.priority) {
        query.eq('priority', filters.priority);
      }
      
      if (filters?.is_read !== undefined) {
        query.eq('is_read', filters.is_read);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const markAsRead = useMutation({
    mutationFn: async (notificationIds: string[]) => {
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString(), is_read: true })
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
