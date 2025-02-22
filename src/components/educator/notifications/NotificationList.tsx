
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
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card key={notification.id}>
          <div className={`p-3 ${!notification.read ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onMarkAsRead([notification.id])}
                        className="self-start h-8 px-3 text-xs"
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600 break-words line-clamp-3">
                    {notification.message}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${getPriorityClass(notification.priority)}`}>
                      {notification.priority}
                    </span>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(notification.created_at).toLocaleDateString()}
                      </span>
                    </div>
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
