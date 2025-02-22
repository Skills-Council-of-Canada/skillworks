
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
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
          <p className="text-gray-600 font-medium">Loading notifications...</p>
        </div>
      </div>
    );
  }

  if (!notifications?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] p-4">
        <div className="bg-primary/5 rounded-full p-8 mb-6">
          <BellDot className="w-16 h-16 text-primary/60" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">All Caught Up!</h3>
        <p className="text-gray-500 text-center max-w-sm text-lg">
          You don't have any notifications at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-white/80 backdrop-blur-sm p-4 z-10">
        <h1 className="text-3xl font-bold text-gray-900">Your Notifications</h1>
        {notifications.some(n => !n.read) && (
          <Button
            variant="outline"
            onClick={() => {
              const unreadIds = notifications
                .filter(n => !n.read)
                .map(n => n.id);
              onMarkAsRead(unreadIds);
            }}
            className="font-medium"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="space-y-4 px-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                rounded-xl border p-5 transition-all duration-300 hover:shadow-md
                ${!notification.read ? 'bg-blue-50/70 border-blue-100' : 'bg-white border-gray-100'}
              `}
            >
              <div className="flex gap-5">
                <div className={`
                  rounded-full p-3.5 flex-shrink-0 
                  ${!notification.read ? 'bg-blue-100' : 'bg-gray-50'}
                `}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {notification.title}
                      </h3>
                      <p className="mt-2 text-gray-600 leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                    
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onMarkAsRead([notification.id])}
                        className="flex-shrink-0 hover:bg-blue-50"
                      >
                        <Check className="w-4 h-4 mr-1.5" />
                        Mark as read
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-4 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1.5" />
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
