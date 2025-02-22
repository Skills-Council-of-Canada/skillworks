
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

  const SidebarContent = () => (
    <NotificationTypesSidebar
      selectedType={selectedType}
      onTypeSelect={(type) => {
        setSelectedType(type);
        if (isMobile) {
          setIsSidebarOpen(false);
        }
      }}
    />
  );

  return (
    <div className="container mx-auto p-2 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="w-full md:w-auto flex items-center gap-2">
          {isMobile && (
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                <div className="py-4">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
          )}
          <div className="flex-grow md:flex-grow-0">
            <NotificationFilters
              selectedType={selectedType}
              timeFilter={timeFilter}
              onTypeChange={(value) => setSelectedType(value as NotificationType | 'all')}
              onTimeFilterChange={(value) => setTimeFilter(value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {!isMobile && (
          <div className="md:col-span-3">
            <SidebarContent />
          </div>
        )}

        <div className="md:col-span-9">
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
