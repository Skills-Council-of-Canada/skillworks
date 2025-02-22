
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
    <Card className="p-4">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              !notification.read ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded ${getPriorityClass(
                      notification.priority
                    )}`}
                  >
                    {notification.priority}
                  </span>
                </div>
                <p className="text-gray-600">{notification.message}</p>
                {notification.content && (
                  <p className="text-sm text-gray-500 mt-1">{notification.content}</p>
                )}
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {new Date(notification.created_at).toLocaleDateString()}
                </div>
              </div>
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsRead([notification.id])}
                >
                  Mark as Read
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
