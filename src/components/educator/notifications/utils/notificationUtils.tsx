
import { Bell, AlertCircle, Info, GraduationCap, BookOpen, MessageCircle } from "lucide-react";
import { NotificationType, NotificationPriority } from "@/hooks/useNotifications";

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'student_signup':
      return <Bell className="h-5 w-5 text-green-600" />;
    case 'progress_update':
      return <BookOpen className="h-5 w-5 text-blue-600" />;
    case 'submission_reminder':
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    case 'feedback_request':
      return <MessageCircle className="h-5 w-5 text-purple-600" />;
    case 'classroom_activity':
      return <Info className="h-5 w-5 text-indigo-600" />;
    case 'certification':
      return <GraduationCap className="h-5 w-5 text-red-600" />;
    default:
      return <Bell className="h-5 w-5 text-gray-600" />;
  }
};

export const getPriorityClass = (priority: NotificationPriority) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'important':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

export const filterNotificationsByTime = (
  notifications: any[],
  timeFilter: 'all' | 'today' | 'week' | 'month'
) => {
  if (timeFilter === "all") return notifications;

  return notifications?.filter(notification => {
    const notificationDate = new Date(notification.created_at);
    
    if (timeFilter === "today") {
      const today = new Date();
      return today.toDateString() === notificationDate.toDateString();
    }
    
    if (timeFilter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return notificationDate > weekAgo;
    }
    
    if (timeFilter === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return notificationDate > monthAgo;
    }
    
    return true;
  });
};
