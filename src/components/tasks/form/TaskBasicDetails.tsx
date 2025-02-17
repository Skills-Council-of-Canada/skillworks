
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TaskBasicDetailsProps {
  title: string;
  description: string;
  onChange: (field: 'title' | 'description', value: string) => void;
}

export const TaskBasicDetails = ({ title, description, onChange }: TaskBasicDetailsProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Enter task description"
          required
        />
      </div>
    </>
  );
};
