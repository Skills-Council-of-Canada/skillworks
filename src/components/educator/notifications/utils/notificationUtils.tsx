
import { Bell, AlertCircle, Info, GraduationCap, BookOpen, MessageCircle } from "lucide-react";
import { NotificationType } from "@/types/educator";

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.STUDENT_SIGNUP:
      return <Bell className="h-5 w-5 text-green-600" />;
    case NotificationType.PROGRESS_UPDATE:
      return <BookOpen className="h-5 w-5 text-blue-600" />;
    case NotificationType.FEEDBACK_REQUEST:
      return <MessageCircle className="h-5 w-5 text-purple-600" />;
    case NotificationType.CLASSROOM_ACTIVITY:
      return <Info className="h-5 w-5 text-indigo-600" />;
    case NotificationType.CERTIFICATION:
      return <GraduationCap className="h-5 w-5 text-red-600" />;
    default:
      return <Bell className="h-5 w-5 text-gray-600" />;
  }
};

export const getPriorityClass = (priority: 'critical' | 'important' | 'normal') => {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'important':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

export const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case NotificationType.STUDENT_SIGNUP:
      return "blue";
    case NotificationType.PROGRESS_UPDATE:
      return "green";
    case NotificationType.FEEDBACK_REQUEST:
      return "yellow";
    case NotificationType.CLASSROOM_ACTIVITY:
      return "purple";
    case NotificationType.CERTIFICATION:
      return "red";
    default:
      return "gray";
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
