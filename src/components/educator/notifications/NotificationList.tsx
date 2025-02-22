
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { DatabaseNotification } from "@/hooks/useNotifications";
import { getNotificationIcon, getPriorityClass } from "@/components/educator/notifications/utils/notificationUtils";

interface NotificationListProps {
  notifications: DatabaseNotification[] | undefined;
  isLoading: boolean;
  onMarkAsRead: (ids: string[]) => void;
}

export const NotificationList = ({ notifications, isLoading, onMarkAsRead }: NotificationListProps) => {
  if (isLoading) {
    return (
      <Card className="p-2 md:p-4">
        <div className="text-center py-4">Loading notifications...</div>
      </Card>
    );
  }

  if (!notifications?.length) {
    return (
      <Card className="p-2 md:p-4">
        <div className="text-center py-4">No notifications found</div>
      </Card>
    );
  }

  return (
    <Card className="p-2 md:p-4">
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-2 md:p-4 rounded-lg border ${
              !notification.read ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-sm md:text-base truncate">{notification.title}</h3>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead([notification.id])}
                      className="flex-shrink-0 h-7 px-2 text-xs"
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
                
                <div className="flex items-center gap-4 mt-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${getPriorityClass(
                      notification.priority
                    )}`}
                  >
                    {notification.priority}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {new Date(notification.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
