
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type NotificationType = 'project_request' | 'project_match' | 'submission_update' | 
                       'review_reminder' | 'message_alert' | 'milestone_alert' | 'system';

interface DatabaseNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: string;
  read: boolean;
  read_at?: string;
  created_at: string;
  user_id: string;
  experience_id?: string;
}

interface NotificationFilters {
  type?: NotificationType;
  read?: boolean;
}

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

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      if (filters?.read !== undefined) {
        query = query.eq('read', filters.read);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as DatabaseNotification[];
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
