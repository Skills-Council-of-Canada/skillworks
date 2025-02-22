
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NotificationType } from "@/types/educator";

interface NotificationFiltersProps {
  selectedType: NotificationType | 'all';
  timeFilter: 'all' | 'today' | 'week' | 'month';
  onTypeChange: (value: NotificationType | 'all') => void;
  onTimeFilterChange: (value: 'all' | 'today' | 'week' | 'month') => void;
}

const NotificationFilters = ({
  selectedType,
  timeFilter,
  onTypeChange,
  onTimeFilterChange,
}: NotificationFiltersProps) => {
  return (
    <div className="flex gap-4">
      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Notifications</SelectItem>
          <SelectItem value={NotificationType.APPLICATION_STATUS}>Application Status</SelectItem>
          <SelectItem value={NotificationType.TASK_ASSIGNMENT}>Task Assignments</SelectItem>
          <SelectItem value={NotificationType.SUBMISSION_REMINDER}>Submission Reminders</SelectItem>
          <SelectItem value={NotificationType.FEEDBACK_RECEIVED}>Feedback Received</SelectItem>
          <SelectItem value={NotificationType.CHAT_MESSAGE}>Chat Messages</SelectItem>
          <SelectItem value={NotificationType.EXPERIENCE_COMPLETION}>Experience Completion</SelectItem>
        </SelectContent>
      </Select>
      <Select value={timeFilter} onValueChange={onTimeFilterChange}>
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
  );
};

export default NotificationFilters;
