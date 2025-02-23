
import { Book, Clock, GraduationCap, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoItem } from "../components/InfoItem";
import { CombinedProfile } from "@/hooks/participant/useProfileCompletion";

interface LearningDetailsProps {
  profile: CombinedProfile | null;
  isEditing: boolean;
  editValues: {
    skill_level: string;
    availability: string;
    educational_background: string;
  };
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (values: Partial<typeof editValues>) => void;
}

export const LearningSection = ({
  profile,
  isEditing,
  editValues,
  onEdit,
  onCancel,
  onSave,
  onChange,
}: LearningDetailsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Learning Details</h2>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Skill Level</label>
            <Select
              value={editValues.skill_level}
              onValueChange={(value) => onChange({ skill_level: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Availability</label>
            <Select
              value={editValues.availability}
              onValueChange={(value) => onChange({ availability: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Educational Background</label>
            <Textarea
              value={editValues.educational_background}
              onChange={(e) => onChange({ educational_background: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <InfoItem
            icon={GraduationCap}
            label="Skill Level"
            value={profile?.skill_level || "Not specified"}
          />
          <InfoItem
            icon={Clock}
            label="Availability"
            value={profile?.availability || "Not specified"}
          />
          <InfoItem
            icon={Book}
            label="Educational Background"
            value={profile?.educational_background || "Not provided"}
          />
        </div>
      )}
    </div>
  );
};
