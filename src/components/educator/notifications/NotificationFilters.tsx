
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NotificationType } from "@/hooks/useNotifications";

interface NotificationFiltersProps {
  selectedType: NotificationType | 'all';
  timeFilter: 'all' | 'today' | 'week' | 'month';
  onTypeChange: (value: NotificationType | 'all') => void;
  onTimeFilterChange: (value: 'all' | 'today' | 'week' | 'month') => void;
}

export const NotificationFilters = ({
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
          <SelectItem value="student_signup">Student Sign-ups</SelectItem>
          <SelectItem value="progress_update">Progress Updates</SelectItem>
          <SelectItem value="submission_reminder">Submissions</SelectItem>
          <SelectItem value="feedback_request">Feedback Requests</SelectItem>
          <SelectItem value="classroom_activity">Classroom Activity</SelectItem>
          <SelectItem value="certification">Certifications</SelectItem>
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
