
import { Button } from "@/components/ui/button";
import { Save, Upload } from "lucide-react";
import { ExperienceFormValues } from "@/types/educator";
import { useExperienceSubmission } from "@/hooks/useExperienceSubmission";

interface ActionButtonsProps {
  values: ExperienceFormValues;
  isComplete: boolean;
}

const ActionButtons = ({ values, isComplete }: ActionButtonsProps) => {
  const { submitExperience, isSubmitting } = useExperienceSubmission();

  const handlePublish = async () => {
    if (!isComplete) return;
    await submitExperience(values, 'pending_approval');
  };

  const handleSaveDraft = async () => {
    await submitExperience(values, 'draft');
  };

  return (
    <div className="flex justify-end space-x-4">
      <Button
        variant="outline"
        onClick={handleSaveDraft}
        disabled={isSubmitting}
        className="flex items-center"
      >
        <Save className="w-4 h-4 mr-2" />
        Save as Draft
      </Button>
      <Button
        onClick={handlePublish}
        disabled={!isComplete || isSubmitting}
        className="bg-primary hover:bg-primary/90 flex items-center"
      >
        <Upload className="w-4 h-4 mr-2" />
        Submit for Approval
      </Button>
    </div>
  );
};

export default ActionButtons;
