
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationType } from "@/types/educator";
import NotificationTypesSidebar from "@/components/participant/notifications/NotificationTypesSidebar";
import { NotificationList } from "@/components/educator/notifications/NotificationList";
import NotificationFilters from "@/components/participant/notifications/NotificationFilters";
import { filterNotificationsByTime } from "@/components/educator/notifications/utils/notificationUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NotificationsPage = () => {
  const [selectedType, setSelectedType] = useState<NotificationType | 'all'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const { notifications, isLoading, markAsRead } = useNotifications(
    selectedType !== 'all' ? { type: selectedType } : undefined
  );

  const handleMarkAsRead = async (notificationIds: string[]) => {
    await markAsRead.mutateAsync(notificationIds);
  };

  const filteredNotifications = filterNotificationsByTime(notifications, timeFilter);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Notifications</h1>
            {isMobile && (
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="pt-6">
                    <NotificationTypesSidebar
                      selectedType={selectedType}
                      onTypeSelect={(type) => {
                        setSelectedType(type);
                        setIsSidebarOpen(false);
                      }}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
          
          <div className="w-full">
            <NotificationFilters
              selectedType={selectedType}
              timeFilter={timeFilter}
              onTypeChange={(value) => setSelectedType(value as NotificationType | 'all')}
              onTimeFilterChange={(value) => setTimeFilter(value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="flex gap-4">
          {!isMobile && (
            <div className="hidden md:block w-64">
              <NotificationTypesSidebar
                selectedType={selectedType}
                onTypeSelect={setSelectedType}
              />
            </div>
          )}
          
          <div className="flex-1">
            <NotificationList
              notifications={filteredNotifications}
              isLoading={isLoading}
              onMarkAsRead={handleMarkAsRead}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
