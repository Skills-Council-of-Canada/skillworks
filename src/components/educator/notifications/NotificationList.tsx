
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
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500">Loading notifications...</p>
        </div>
      </Card>
    );
  }

  if (!notifications?.length) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500">No notifications found</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className="overflow-hidden">
          <div
            className={`p-4 ${
              !notification.read ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 pt-1">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-base truncate pr-4">
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead([notification.id])}
                      className="self-start shrink-0 h-8 px-3 text-xs"
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {notification.message}
                </p>
                
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full ${getPriorityClass(
                      notification.priority
                    )}`}
                  >
                    {notification.priority}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(notification.created_at).toLocaleDateString()}
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
