
import { UseFormReturn } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExperienceFormValues } from "@/types/educator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BasicDetailsSection from "./sections/BasicDetailsSection";
import CategorySkillsSection from "./sections/CategorySkillsSection";
import LearnerDetailsSection from "./sections/LearnerDetailsSection";
import TimelineSection from "./sections/TimelineSection";
import CompanyPreferencesSection from "./sections/CompanyPreferencesSection";
import ActionButtons from "./ActionButtons";

interface Props {
  form: UseFormReturn<ExperienceFormValues>;
  onEdit: (step: string) => void;
}

const ReviewStep = ({ form, onEdit }: Props) => {
  const values = form.getValues();

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

      <ActionButtons values={values} isComplete={isComplete} />
    </div>
  );
};

export default ReviewStep;
