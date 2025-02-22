
import { NotificationType, NotificationPriority } from "@/types/educator";
import { Bell, MessageSquare, CheckCircle, Clock, Star, Trophy } from "lucide-react";
import { DatabaseNotification } from "@/hooks/useNotifications";

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.APPLICATION_STATUS:
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case NotificationType.TASK_ASSIGNMENT:
      return <Bell className="h-5 w-5 text-blue-500" />;
    case NotificationType.SUBMISSION_REMINDER:
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case NotificationType.FEEDBACK_RECEIVED:
      return <Star className="h-5 w-5 text-purple-500" />;
    case NotificationType.CHAT_MESSAGE:
      return <MessageSquare className="h-5 w-5 text-indigo-500" />;
    case NotificationType.EXPERIENCE_COMPLETION:
      return <Trophy className="h-5 w-5 text-orange-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

export const getPriorityClass = (priority: NotificationPriority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const filterNotificationsByTime = (
  notifications: DatabaseNotification[] | undefined,
  timeFilter: 'all' | 'today' | 'week' | 'month'
) => {
  if (!notifications) return [];
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  return notifications.filter((notification) => {
    const notificationDate = new Date(notification.created_at);
    
    switch (timeFilter) {
      case 'today':
        return notificationDate >= today;
      case 'week':
        return notificationDate >= weekAgo;
      case 'month':
        return notificationDate >= monthAgo;
      default:
        return true;
    }
  });
};
