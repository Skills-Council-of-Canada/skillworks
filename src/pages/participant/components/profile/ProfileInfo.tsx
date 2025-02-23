
import { useState } from "react";
import { CombinedProfile } from "@/hooks/participant/useProfileCompletion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ContactSection } from "./sections/ContactSection";
import { LearningSection } from "./sections/LearningSection";
import { LearningAreasSection } from "./sections/LearningAreasSection";

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

  const handleChange = (section: string, values: any) => {
    setEditValues(prev => ({ ...prev, ...values }));
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <ContactSection
        profile={profile}
        isEditing={editingSection === 'contact'}
        editValues={{
          email: editValues.email,
          phone: editValues.phone,
        }}
        onEdit={() => setEditingSection(editingSection === 'contact' ? null : 'contact')}
        onCancel={() => setEditingSection(null)}
        onSave={() => handleSave('contact')}
        onChange={(values) => handleChange('contact', values)}
      />

      <LearningSection
        profile={profile}
        isEditing={editingSection === 'learning'}
        editValues={{
          skill_level: editValues.skill_level,
          availability: editValues.availability,
          educational_background: editValues.educational_background,
        }}
        onEdit={() => setEditingSection(editingSection === 'learning' ? null : 'learning')}
        onCancel={() => setEditingSection(null)}
        onSave={() => handleSave('learning')}
        onChange={(values) => handleChange('learning', values)}
      />

      <LearningAreasSection
        profile={profile}
        onEdit={() => setEditingSection(editingSection === 'learning_areas' ? null : 'learning_areas')}
      />
    </div>
  );
};
