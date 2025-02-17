
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskSubmissionTypeProps {
  submissionType: 'text' | 'file' | 'link';
  onChange: (value: 'text' | 'file' | 'link') => void;
}

export const TaskSubmissionType = ({ submissionType, onChange }: TaskSubmissionTypeProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Submission Type</label>
      <Select
        value={submissionType}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select submission type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="text">Text</SelectItem>
          <SelectItem value="file">File Upload</SelectItem>
          <SelectItem value="link">Link</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
