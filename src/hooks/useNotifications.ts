
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type NotificationType = 
  | 'student_signup'      // New student joins
  | 'progress_update'     // Milestone reached
  | 'submission_reminder' // Student work submitted
  | 'feedback_request'    // Review requested
  | 'classroom_activity'  // Discussions and engagement
  | 'certification'       // Completion alerts
  | 'system';            // System notifications

export type NotificationPriority = 'critical' | 'important' | 'general';

export interface DatabaseNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  read: boolean;
  read_at: string | null;
  created_at: string;
  user_id: string;
  experience_id?: string;
  content?: string;
}

type NotificationFilters = {
  type?: NotificationType;
  priority?: NotificationPriority;
  read?: boolean;
};

export const useNotifications = (filters?: NotificationFilters) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: notifications, isLoading } = useQuery<DatabaseNotification[]>({
    queryKey: ['notifications', filters],
    queryFn: async () => {
      const query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (filters?.type) {
        query.eq('type', filters.type);
      }
      
      if (filters?.priority) {
        query.eq('priority', filters.priority);
      }
      
      if (filters?.read !== undefined) {
        query.eq('read', filters.read);
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
        .update({ read_at: new Date().toISOString(), read: true })
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
