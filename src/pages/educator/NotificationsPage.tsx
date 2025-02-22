
import { useState } from "react";
import { useNotifications, NotificationType } from "@/hooks/useNotifications";
import { NotificationTypesSidebar } from "@/components/educator/notifications/NotificationTypesSidebar";
import { NotificationList } from "@/components/educator/notifications/NotificationList";
import { NotificationFilters } from "@/components/educator/notifications/NotificationFilters";
import { filterNotificationsByTime } from "@/components/educator/notifications/utils/notificationUtils";

const NotificationsPage = () => {
  const [selectedType, setSelectedType] = useState<NotificationType | 'all'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  
  const { notifications, isLoading, markAsRead } = useNotifications(
    selectedType !== 'all' ? { type: selectedType } : undefined
  );

  const handleMarkAsRead = async (notificationIds: string[]) => {
    await markAsRead.mutateAsync(notificationIds);
  };

  const filteredNotifications = filterNotificationsByTime(notifications, timeFilter);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <NotificationFilters
          selectedType={selectedType}
          timeFilter={timeFilter}
          onTypeChange={(value) => setSelectedType(value as NotificationType | 'all')}
          onTimeFilterChange={(value) => setTimeFilter(value)}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <NotificationTypesSidebar
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        </div>

        <div className="col-span-9">
          <NotificationList
            notifications={filteredNotifications}
            isLoading={isLoading}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
