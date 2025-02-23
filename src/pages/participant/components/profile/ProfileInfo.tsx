
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
  className?: string;
}

const InfoItem = ({ icon: Icon, label, value, className = "" }: InfoItemProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);

interface ProfileInfoProps {
  profile: CombinedProfile | null;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    email: profile?.email || "",
    phone: profile?.phone || "",
    skill_level: profile?.skill_level || "",
    availability: profile?.availability || "",
    educational_background: profile?.educational_background || "",
  });

  const handleSave = async (section: string) => {
    if (!user?.id) return;

    try {
      let updates = {};
      switch (section) {
        case 'contact':
          updates = {
            email: editValues.email,
            phone: editValues.phone,
          };
          break;
        case 'learning':
          updates = {
            skill_level: editValues.skill_level,
            availability: editValues.availability,
            educational_background: editValues.educational_background,
          };
          break;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Updated successfully",
        description: "Your profile has been updated.",
      });
      setEditingSection(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingSection(editingSection === 'contact' ? null : 'contact')}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        {editingSection === 'contact' ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                value={editValues.email}
                onChange={(e) => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1"
                type="email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <Input
                value={editValues.phone}
                onChange={(e) => setEditValues(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1"
                type="tel"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => handleSave('contact')}>
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

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Learning Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingSection(editingSection === 'learning' ? null : 'learning')}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        {editingSection === 'learning' ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Skill Level</label>
              <Select
                value={editValues.skill_level}
                onValueChange={(value) => setEditValues(prev => ({ ...prev, skill_level: value }))}
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
                onValueChange={(value) => setEditValues(prev => ({ ...prev, availability: value }))}
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
                onChange={(e) => setEditValues(prev => ({ ...prev, educational_background: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => handleSave('learning')}>
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

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Preferred Learning Areas</h2>
          <Button variant="ghost" size="sm">
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
