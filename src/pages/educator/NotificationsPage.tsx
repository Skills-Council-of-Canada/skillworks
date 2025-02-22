
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationList } from "@/components/educator/notifications/NotificationList";

const NotificationsPage = () => {
  const { notifications, isLoading, markAsRead } = useNotifications();

  const handleMarkAsRead = async (notificationIds: string[]) => {
    await markAsRead.mutateAsync(notificationIds);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <NotificationList 
        notifications={notifications}
        isLoading={isLoading}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default NotificationsPage;
