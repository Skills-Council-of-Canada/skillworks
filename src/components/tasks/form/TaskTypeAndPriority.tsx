
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskTypeAndPriorityProps {
  type: 'required' | 'recommended' | 'optional';
  priority: 'high' | 'medium' | 'low';
  onTypeChange: (value: 'required' | 'recommended' | 'optional') => void;
  onPriorityChange: (value: 'high' | 'medium' | 'low') => void;
}

export const TaskTypeAndPriority = ({
  type,
  priority,
  onTypeChange,
  onPriorityChange
}: TaskTypeAndPriorityProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select
          value={type}
          onValueChange={onTypeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="required">Required</SelectItem>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="optional">Optional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Priority</label>
        <Select
          value={priority}
          onValueChange={onPriorityChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
