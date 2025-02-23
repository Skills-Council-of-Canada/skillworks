
import { Mail, Phone, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoItem } from "../components/InfoItem";
import { CombinedProfile } from "@/hooks/participant/useProfileCompletion";

interface ContactSectionProps {
  profile: CombinedProfile | null;
  isEditing: boolean;
  editValues: {
    email: string;
    phone: string;
  };
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onChange: (values: { email?: string; phone?: string }) => void;
}

export const ContactSection = ({
  profile,
  isEditing,
  editValues,
  onEdit,
  onCancel,
  onSave,
  onChange,
}: ContactSectionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              value={editValues.email}
              onChange={(e) => onChange({ email: e.target.value })}
              className="mt-1"
              type="email"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <Input
              value={editValues.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="mt-1"
              type="tel"
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
          <InfoItem icon={Mail} label="Email" value={profile?.email || "Not provided"} />
          <InfoItem icon={Phone} label="Phone" value={profile?.phone || "Not provided"} />
        </div>
      )}
    </div>
  );
};
