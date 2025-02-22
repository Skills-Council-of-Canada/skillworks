
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationType, NotificationPriority } from "@/types/educator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, MessageSquare, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  
  const { notifications, isLoading, markAsRead } = useNotifications(
    filter === "unread" ? { read: false } : undefined
  );

  const handleMarkAsRead = async (notificationIds: string[]) => {
    await markAsRead.mutateAsync(notificationIds);
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.CHAT_MESSAGE:
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case NotificationType.TASK_ASSIGNMENT:
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "important":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
            {notifications?.some(n => !n.read) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  const unreadIds = notifications
                    .filter(n => !n.read)
                    .map(n => n.id);
                  handleMarkAsRead(unreadIds);
                }}
              >
                Mark all as read
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="all" 
                onClick={() => setFilter("all")}
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="unread" 
                onClick={() => setFilter("unread")}
              >
                Unread
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Notification List */}
      <ScrollArea className="flex-1 px-4 py-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500">Loading notifications...</p>
          </div>
        ) : !notifications?.length ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <Bell className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-500">No notifications found</p>
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border p-4 ${
                  !notification.read ? "border-l-4 border-l-purple-500" : ""
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 -mr-2"
                            onClick={() => handleMarkAsRead([notification.id])}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 break-words">
                        {notification.message}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge
                          variant="secondary"
                          className={`${getPriorityColor(notification.priority)}`}
                        >
                          {notification.priority}
                        </Badge>
                        
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </div>
                      </div>
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
