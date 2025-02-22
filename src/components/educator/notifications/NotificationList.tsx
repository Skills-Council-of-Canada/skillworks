
import { DatabaseNotification } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BellDot, MessageSquare, Clock, Check } from "lucide-react";
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
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500">Loading notifications...</p>
      </div>
    );
  }

  if (!notifications?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
        <BellDot className="w-12 h-12 text-gray-400 mb-3" />
        <p className="text-gray-500 font-medium">All Caught Up!</p>
        <p className="text-sm text-gray-400 mt-1">No notifications to display</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile header with actions */}
      <div className="sticky top-0 bg-white border-b z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Notifications</h2>
          {notifications.some(n => !n.read) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const unreadIds = notifications
                  .filter(n => !n.read)
                  .map(n => n.id);
                onMarkAsRead(unreadIds);
              }}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications list */}
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 bg-white transition-all ${
                !notification.read ? 'bg-blue-50/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full flex-shrink-0 ${
                  !notification.read ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onMarkAsRead([notification.id])}
                        className="h-7 px-2 text-xs hover:bg-blue-50"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Mark as read
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 pt-1">
                    <Clock className="w-3 h-3 mr-1" />
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
