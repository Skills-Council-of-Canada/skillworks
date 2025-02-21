
import { useCallback, useState } from "react";
import { Bell, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotifications, NotificationCategory, NotificationPriority } from "@/hooks/useNotifications";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationsSettings } from "../admin/components/settings/NotificationsSettings";

const priorityColors = {
  critical: "bg-red-500 text-white",
  important: "bg-yellow-500 text-white",
  general: "bg-blue-500 text-white",
} as const;

const categoryIcons = {
  project_request: AlertCircle,
  project_match: CheckCircle2,
  submission_update: Clock,
  review_reminder: Clock,
  message_alert: Bell,
  milestone_alert: Bell,
  system: Bell,
} as const;

export default function NotificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory | undefined>();
  const [selectedPriority, setSelectedPriority] = useState<NotificationPriority | undefined>();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("notifications");

  const { notifications, isLoading, markAsRead } = useNotifications({
    category: selectedCategory,
    priority: selectedPriority,
    is_read: showUnreadOnly ? false : undefined,
  });

  const handleMarkAsRead = useCallback((notificationId: string) => {
    markAsRead.mutate([notificationId]);
  }, [markAsRead]);

  const handleMarkAllAsRead = useCallback(() => {
    if (!notifications) return;
    const unreadIds = notifications
      .filter(n => !n.is_read)
      .map(n => n.id);
    if (unreadIds.length > 0) {
      markAsRead.mutate(unreadIds);
    }
  }, [notifications, markAsRead]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-foreground" />
          <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-foreground" />
          <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className="text-sm"
          >
            {showUnreadOnly ? 'Show All' : 'Show Unread Only'}
          </Button>
          <Button onClick={handleMarkAllAsRead} className="text-sm">
            Mark All as Read
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-11 bg-background border-[0.5px] p-1 rounded-md">
          <TabsTrigger 
            value="notifications" 
            className="rounded text-sm data-[state=active]:bg-accent data-[state=active]:shadow-none"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="rounded text-sm data-[state=active]:bg-accent data-[state=active]:shadow-none"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="notifications" className="mt-6">
          <div className="space-y-2">
            {notifications?.length === 0 ? (
              <Card className="p-6">
                <p className="text-center text-muted-foreground">No notifications yet</p>
              </Card>
            ) : (
              notifications?.map((notification) => {
                const Icon = categoryIcons[notification.category];
                return (
                  <Card
                    key={notification.id}
                    className="p-4 hover:bg-accent/50 transition-colors border-[0.5px]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Icon className={`h-4 w-4 ${!notification.is_read ? 'text-blue-500' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                          {notification.content}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {notification.category.replace('_', ' ')}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={`text-xs ${priorityColors[notification.priority]} border-[0.5px]`}
                          >
                            {notification.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(notification.created_at), 'PPp')}
                          </span>
                        </div>
                      </div>
                      {!notification.is_read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-xs"
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <NotificationsSettings
            settings={[]}
            isLoading={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
