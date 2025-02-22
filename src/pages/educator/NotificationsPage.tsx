
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationType } from "@/types/educator";
import NotificationTypesSidebar from "@/components/participant/notifications/NotificationTypesSidebar";
import { NotificationList } from "@/components/educator/notifications/NotificationList";
import NotificationFilters from "@/components/participant/notifications/NotificationFilters";
import { filterNotificationsByTime } from "@/components/educator/notifications/utils/notificationUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const NotificationsPage = () => {
  const [selectedType, setSelectedType] = useState<NotificationType | 'all'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const isMobile = useIsMobile();
  
  const { notifications, isLoading, markAsRead } = useNotifications(
    selectedType !== 'all' ? { type: selectedType } : undefined
  );

  const handleMarkAsRead = async (notificationIds: string[]) => {
    await markAsRead.mutateAsync(notificationIds);
  };

  const filteredNotifications = filterNotificationsByTime(notifications, timeFilter);

  return (
    <div className="flex-1 h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <NotificationFilters
            selectedType={selectedType}
            timeFilter={timeFilter}
            onTypeChange={(value) => setSelectedType(value as NotificationType | 'all')}
            onTimeFilterChange={(value) => setTimeFilter(value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex h-[calc(100vh-10rem)]">
        {/* Sidebar */}
        <div className="w-[250px] border-r p-4 hidden md:block">
          <div className="mb-4">
            <h2 className="font-semibold mb-4">Notification Types</h2>
            <NotificationTypesSidebar
              selectedType={selectedType}
              onTypeSelect={setSelectedType}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
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
