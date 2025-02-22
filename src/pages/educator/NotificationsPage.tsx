import { useState } from "react";
import { useNotifications, NotificationCategory } from "@/hooks/useNotifications";
import { Bell, AlertCircle, Info, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

type FilterType = "all" | "unread" | "critical" | "important" | "general";
type TimeFilter = "all" | "today" | "week" | "month";

const NotificationsPage = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const { notifications, isLoading, markAsRead } = useNotifications();

  const handleMarkAsRead = async (notificationIds: string[]) => {
    try {
      await markAsRead.mutateAsync(notificationIds);
      toast({
        title: "Success",
        description: "Notifications marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive",
      });
    }
  };

  const getPriorityBadgeColor = (category: string) => {
    switch (category) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'important':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getNotificationIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'student_signup':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'progress_update':
        return <Bell className="h-5 w-5 text-yellow-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const filteredNotifications = notifications?.filter((notification) => {
    if (filter === "unread" && notification.read_at) return false;
    if (filter === "critical" && notification.priority !== "critical") return false;
    if (filter === "important" && notification.priority !== "important") return false;
    if (filter === "general" && notification.priority !== "general") return false;

    if (timeFilter === "today") {
      const today = new Date();
      const notificationDate = new Date(notification.created_at);
      return today.toDateString() === notificationDate.toDateString();
    }
    if (timeFilter === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(notification.created_at) > weekAgo;
    }
    if (timeFilter === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return new Date(notification.created_at) > monthAgo;
    }

    return true;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex gap-4">
          <Select value={filter} onValueChange={(value: FilterType) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread Only</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="important">Important</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeFilter} onValueChange={(value: TimeFilter) => setTimeFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="col-span-3">
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              <button
                className={`w-full text-left p-2 rounded ${
                  filter === "critical" ? "bg-red-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setFilter("critical")}
              >
                <span className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  Critical
                </span>
              </button>
              <button
                className={`w-full text-left p-2 rounded ${
                  filter === "important" ? "bg-yellow-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setFilter("important")}
              >
                <span className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-yellow-600" />
                  Important
                </span>
              </button>
              <button
                className={`w-full text-left p-2 rounded ${
                  filter === "general" ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setFilter("general")}
              >
                <span className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  General
                </span>
              </button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-6">
          <Card className="p-4">
            {isLoading ? (
              <div className="text-center py-4">Loading notifications...</div>
            ) : filteredNotifications?.length === 0 ? (
              <div className="text-center py-4">No notifications found</div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications?.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      !notification.read_at ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.category)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded ${getPriorityBadgeColor(
                              notification.priority
                            )}`}
                          >
                            {notification.priority}
                          </span>
                        </div>
                        <p className="text-gray-600">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {new Date(notification.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      {!notification.read_at && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead([notification.id])}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Sidebar - Settings */}
        <div className="col-span-3">
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm">Email Notifications</label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Student Sign-ups</label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Progress Updates</label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Submission Alerts</label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Feedback Requests</label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Classroom Activity</label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Certification Alerts</label>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
