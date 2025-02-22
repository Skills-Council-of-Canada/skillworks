
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
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        
        {/* Mobile Filter Controls */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {isMobile ? (
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filter Notifications
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <div className="pt-6">
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
          ) : null}
          
          <div className="w-full sm:w-auto">
            <NotificationFilters
              selectedType={selectedType}
              timeFilter={timeFilter}
              onTypeChange={(value) => setSelectedType(value as NotificationType | 'all')}
              onTimeFilterChange={(value) => setTimeFilter(value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar - Hidden on mobile, shown as sheet */}
        {!isMobile && (
          <div className="lg:col-span-3">
            <div className="sticky top-6">
              <SidebarContent />
            </div>
          </div>
        )}
        
        {/* Notifications List */}
        <div className="lg:col-span-9">
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
