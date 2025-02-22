
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
      <Card className="p-4">
        <div className="text-center py-4">Loading notifications...</div>
      </Card>
    );
  }

  if (!notifications?.length) {
    return (
      <Card className="p-4">
        <div className="text-center py-4">No notifications found</div>
      </Card>
    );
  }

  return (
    <Card className="p-2 md:p-4">
      <div className="space-y-2 md:space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 md:p-4 rounded-lg border ${
              !notification.read ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
              <div className="flex md:block items-center gap-2">
                {getNotificationIcon(notification.type)}
                <span
                  className={`text-xs px-2 py-1 rounded inline-block md:mt-2 ${getPriorityClass(
                    notification.priority
                  )}`}
                >
                  {notification.priority}
                </span>
              </div>
              
              <div className="flex-grow space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm md:text-base">{notification.title}</h3>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead([notification.id])}
                      className="shrink-0 -mt-1 h-8"
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
                
                <p className="text-sm text-gray-600">{notification.message}</p>
                {notification.content && (
                  <p className="text-xs md:text-sm text-gray-500">{notification.content}</p>
                )}
                
                <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                  <Clock className="h-3 w-3 md:h-4 md:w-4" />
                  {new Date(notification.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
