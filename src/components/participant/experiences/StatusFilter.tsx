
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const StatusFilter = ({ value, onValueChange }: StatusFilterProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] bg-transparent">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent className="bg-background border shadow-lg">
        <SelectItem value="all">All Experiences</SelectItem>
        <SelectItem value="in_progress">In Progress</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
};
