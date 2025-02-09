
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExperienceFormValues } from "@/types/educator";
import { AlertCircle, Save, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useExperienceSubmission } from "@/hooks/useExperienceSubmission";
import BasicDetailsSection from "./sections/BasicDetailsSection";
import CategorySkillsSection from "./sections/CategorySkillsSection";
import LearnerDetailsSection from "./sections/LearnerDetailsSection";
import TimelineSection from "./sections/TimelineSection";
import CompanyPreferencesSection from "./sections/CompanyPreferencesSection";

interface Props {
  form: UseFormReturn<ExperienceFormValues>;
  onEdit: (step: string) => void;
}

const ReviewStep = ({ form, onEdit }: Props) => {
  const values = form.getValues();
  const { submitExperience, isSubmitting } = useExperienceSubmission();

  const isComplete = Boolean(
    values.title &&
    values.description &&
    values.trade_category &&
    values.skill_level &&
    values.start_date &&
    values.end_date &&
    values.milestones.length > 0 &&
    values.class_size &&
    values.team_size
  );

  const handlePublish = async () => {
    if (!isComplete) return;
    await submitExperience(values, 'pending_approval');
  };

  const handleSaveDraft = async () => {
    await submitExperience(values, 'draft');
  };

  return (
    <div className="space-y-6">
      {!isComplete && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please complete all mandatory fields before publishing.
          </AlertDescription>
        </Alert>
      )}

      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-6">
          <BasicDetailsSection values={values} onEdit={onEdit} />
          <CategorySkillsSection values={values} onEdit={onEdit} />
          <LearnerDetailsSection values={values} onEdit={onEdit} />
          <TimelineSection values={values} onEdit={onEdit} />
          <CompanyPreferencesSection values={values} onEdit={onEdit} />
        </div>
      </ScrollArea>

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
    </div>
  );
};

export default ReviewStep;
