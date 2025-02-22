
import { DatabaseNotification } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BellDot, Clock, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getNotificationIcon } from "@/components/educator/notifications/utils/notificationUtils";

interface NotificationListProps {
  notifications: DatabaseNotification[] | undefined;
  isLoading: boolean;
  onMarkAsRead: (ids: string[]) => void;
}

export const NotificationList = ({ notifications, isLoading, onMarkAsRead }: NotificationListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          <p className="text-gray-600">Loading your notifications...</p>
        </div>
      </div>
    );
  }

  if (!notifications?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] p-4">
        <div className="bg-gray-50 rounded-full p-6 mb-4">
          <BellDot className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
        <p className="text-gray-500 text-center max-w-sm">
          You have no new notifications. Check back later for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        {notifications.some(n => !n.read) && (
          <Button
            variant="outline"
            onClick={() => {
              const unreadIds = notifications
                .filter(n => !n.read)
                .map(n => n.id);
              onMarkAsRead(unreadIds);
            }}
            className="text-sm"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                rounded-lg border p-4 transition-all duration-200
                ${!notification.read ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-gray-100'}
              `}
            >
              <div className="flex gap-4">
                <div className={`
                  rounded-full p-3 flex-shrink-0 
                  ${!notification.read ? 'bg-blue-100' : 'bg-gray-100'}
                `}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-gray-600">
                        {notification.message}
                      </p>
                    </div>
                    
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onMarkAsRead([notification.id])}
                        className="flex-shrink-0"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Mark as read
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-3 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
