
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Book, Clock, GraduationCap, Pencil } from "lucide-react";
import { CombinedProfile } from "@/hooks/participant/useProfileCompletion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface InfoItemProps {
  icon: any;
  label: string;
  value: string;
  onEdit?: () => void;
  className?: string;
}

const InfoItem = ({ icon: Icon, label, value, onEdit, className = "" }: InfoItemProps) => (
  <div className={`flex items-center justify-between ${className}`}>
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
    {onEdit && (
      <Button variant="ghost" size="sm" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </Button>
    )}
  </div>
);

interface ProfileInfoProps {
  profile: CombinedProfile | null;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSave = async () => {
    if (!user?.id || !editingField) return;

    try {
      const updates: Record<string, any> = {};
      updates[editingField] = editValue;

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Updated successfully",
        description: "Your profile has been updated.",
      });

      setEditingField(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  const renderEditField = (field: string) => {
    const commonProps = {
      value: editValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        setEditValue(e.target.value),
      className: "mb-2",
    };

    switch (field) {
      case 'bio':
        return <Textarea {...commonProps} />;
      case 'skill_level':
        return (
          <Select value={editValue} onValueChange={setEditValue}>
            <SelectTrigger>
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        );
      default:
        return <Input {...commonProps} />;
    }
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
        <div className="space-y-4">
          {editingField === 'email' ? (
            <div>
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="mb-2"
                type="email"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                <Button size="sm" onClick={handleSave}>Save</Button>
              </div>
            </div>
          ) : (
            <InfoItem
              icon={Mail}
              label="Email"
              value={profile?.email || "Not provided"}
              onEdit={() => handleEdit('email', profile?.email || '')}
            />
          )}

          {editingField === 'phone' ? (
            <div>
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="mb-2"
                type="tel"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                <Button size="sm" onClick={handleSave}>Save</Button>
              </div>
            </div>
          ) : (
            <InfoItem
              icon={Phone}
              label="Phone"
              value={profile?.phone || "Not provided"}
              onEdit={() => handleEdit('phone', profile?.phone || '')}
            />
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Details</h2>
        <div className="space-y-4">
          {editingField === 'skill_level' ? (
            <div>
              <Select value={editValue} onValueChange={setEditValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select skill level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                <Button size="sm" onClick={handleSave}>Save</Button>
              </div>
            </div>
          ) : (
            <InfoItem
              icon={GraduationCap}
              label="Skill Level"
              value={profile?.skill_level || "Not specified"}
              onEdit={() => handleEdit('skill_level', profile?.skill_level || '')}
            />
          )}

          {editingField === 'availability' ? (
            <div>
              <Select value={editValue} onValueChange={setEditValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                <Button size="sm" onClick={handleSave}>Save</Button>
              </div>
            </div>
          ) : (
            <InfoItem
              icon={Clock}
              label="Availability"
              value={profile?.availability || "Not specified"}
              onEdit={() => handleEdit('availability', profile?.availability || '')}
            />
          )}

          {editingField === 'educational_background' ? (
            <div>
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                <Button size="sm" onClick={handleSave}>Save</Button>
              </div>
            </div>
          ) : (
            <InfoItem
              icon={Book}
              label="Educational Background"
              value={profile?.educational_background || "Not provided"}
              onEdit={() => handleEdit('educational_background', profile?.educational_background || '')}
            />
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Preferred Learning Areas</h2>
          <Button variant="ghost" size="sm" onClick={() => handleEdit('preferred_learning_areas', '')}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile?.preferred_learning_areas?.length ? (
            profile.preferred_learning_areas.map((area, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {area}
              </Badge>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No learning areas specified</p>
          )}
        </div>
      </div>
    </div>
  );
};
