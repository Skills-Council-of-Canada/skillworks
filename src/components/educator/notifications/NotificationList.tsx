
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { DatabaseNotification } from "@/hooks/useNotifications";
import { getNotificationIcon, getPriorityClass } from "@/components/educator/notifications/utils/notificationUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NotificationListProps {
  notifications: DatabaseNotification[] | undefined;
  isLoading: boolean;
  onMarkAsRead: (ids: string[]) => void;
}

export const NotificationList = ({ notifications, isLoading, onMarkAsRead }: NotificationListProps) => {
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <Card className="p-4 w-full">
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500">Loading notifications...</p>
        </div>
      </Card>
    );
  }

  if (!notifications?.length) {
    return (
      <Card className="p-4 w-full">
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500">No notifications found</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3 w-full">
      {notifications.map((notification) => (
        <Card 
          key={notification.id} 
          className="w-full"
        >
          <div
            className={`p-3 md:p-4 ${
              !notification.read ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm md:text-base break-words">
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead([notification.id])}
                      className="self-start md:self-center shrink-0 h-8 px-3 text-xs w-full md:w-auto"
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
                
                <p className="text-xs md:text-sm text-gray-600 break-words">
                  {notification.message}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <span
                    className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${getPriorityClass(
                      notification.priority
                    )}`}
                  >
                    {notification.priority}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    <span className="whitespace-nowrap">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
