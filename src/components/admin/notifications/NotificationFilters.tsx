
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
  onTypeChange: (value: string) => void;
  onTimeFilterChange: (value: 'all' | 'today' | 'week' | 'month') => void;
}

const NotificationFilters = ({
  selectedType,
  timeFilter,
  onTypeChange,
  onTimeFilterChange,
}: NotificationFiltersProps) => {
  return (
    <div className="flex gap-4 items-center">
      <Select
        value={timeFilter}
        onValueChange={(value) => onTimeFilterChange(value as 'all' | 'today' | 'week' | 'month')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        onClick={() => {
          onTimeFilterChange('all');
          onTypeChange('all');
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default NotificationFilters;
