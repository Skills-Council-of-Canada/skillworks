
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationType } from "@/types/educator";
import { Button } from "@/components/ui/button";
import { BellDot, MessageSquare, Check, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const NotificationsPage = () => {
  const { notifications, isLoading, markAsRead } = useNotifications();

  const handleMarkAsRead = async (notificationIds: string[]) => {
    await markAsRead.mutateAsync(notificationIds);
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.CHAT_MESSAGE:
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <BellDot className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">Notifications</h1>
          {notifications?.some(n => !n.read) && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
              onClick={() => {
                const unreadIds = notifications
                  .filter(n => !n.read)
                  .map(n => n.id);
                handleMarkAsRead(unreadIds);
              }}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Notifications list */}
      <ScrollArea className="h-[calc(100vh-64px)]">
        {!notifications?.length ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <BellDot className="w-10 h-10 text-gray-400 mb-3" />
            <p className="text-gray-500">You're all caught up!</p>
            <p className="text-sm text-gray-400">No new notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 bg-white transition-colors ${
                  !notification.read ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${!notification.read ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(notification.created_at).toLocaleDateString()}
                      </div>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead([notification.id])}
                          className="ml-auto h-6 px-2 text-xs hover:bg-blue-50"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationsPage;
