import { useState } from "react";
import { useNotifications, NotificationType, NotificationPriority } from "@/hooks/useNotifications";
import { Bell, AlertCircle, Info, Clock, GraduationCap, BookOpen, MessageCircle } from "lucide-react";
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

const NotificationsPage = () => {
  const [selectedType, setSelectedType] = useState<NotificationType | 'all'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const { notifications, isLoading, markAsRead } = useNotifications(
    selectedType !== 'all' ? { type: selectedType as NotificationType } : undefined
  );

  const handleMarkAsRead = async (notificationIds: string[]) => {
    try {
      await markAsRead.mutateAsync(notificationIds);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive",
      });
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'student_signup':
        return <Bell className="h-5 w-5 text-green-600" />;
      case 'progress_update':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'submission_reminder':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'feedback_request':
        return <MessageCircle className="h-5 w-5 text-purple-600" />;
      case 'classroom_activity':
        return <Info className="h-5 w-5 text-indigo-600" />;
      case 'certification':
        return <GraduationCap className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityClass = (priority: NotificationPriority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'important':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredNotifications = notifications?.filter(notification => {
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
          <Select value={selectedType} onValueChange={(value) => setSelectedType(value as NotificationType | 'all')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="student_signup">Student Sign-ups</SelectItem>
              <SelectItem value="progress_update">Progress Updates</SelectItem>
              <SelectItem value="submission_reminder">Submissions</SelectItem>
              <SelectItem value="feedback_request">Feedback Requests</SelectItem>
              <SelectItem value="classroom_activity">Classroom Activity</SelectItem>
              <SelectItem value="certification">Certifications</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeFilter} onValueChange={(value: any) => setTimeFilter(value)}>
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
        <div className="col-span-3">
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Notification Types</h2>
            <div className="space-y-2">
              {Object.entries({
                'student_signup': 'Student Sign-ups',
                'progress_update': 'Progress Updates',
                'submission_reminder': 'Submissions',
                'feedback_request': 'Feedback Requests',
                'classroom_activity': 'Classroom Activity',
                'certification': 'Certifications'
              }).map(([type, label]) => (
                <button
                  key={type}
                  className={`w-full text-left p-2 rounded ${
                    selectedType === type ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType(type as NotificationType)}
                >
                  <span className="flex items-center gap-2">
                    {getNotificationIcon(type as NotificationType)}
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

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
                      !notification.read ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded ${getPriorityClass(
                              notification.priority
                            )}`}
                          >
                            {notification.priority}
                          </span>
                        </div>
                        <p className="text-gray-600">{notification.message}</p>
                        {notification.content && (
                          <p className="text-sm text-gray-500 mt-1">{notification.content}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {new Date(notification.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      {!notification.read && (
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
                <label className="text-sm">Submissions</label>
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
                <label className="text-sm">Certifications</label>
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
