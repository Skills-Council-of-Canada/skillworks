
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ExperienceStepperProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  isStepValid: boolean;
  onSubmit: () => void;
  isLastStep: boolean;
  isSaving?: boolean;
  onSaveDraft: () => void;
}

const STEPS = [
  { label: "Experience Details" },
  { label: "Meta Categorization" },
  { label: "Learner Setup" },
  { label: "Timeline" },
  { label: "Company Preferences" },
  { label: "Review" }
];

export const ExperienceStepper = ({
  currentStep,
  onStepChange,
  isStepValid,
  onSubmit,
  isLastStep,
  isSaving,
  onSaveDraft
}: ExperienceStepperProps) => {
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">
            {STEPS[currentStep - 1]?.label}
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {STEPS.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Draft"}
        </Button>
        
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => onStepChange(currentStep - 1)}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          <Button
            onClick={() => isLastStep ? onSubmit() : onStepChange(currentStep + 1)}
            disabled={!isStepValid || isSaving}
            className="flex items-center"
          >
            {isLastStep ? (
              "Submit Experience"
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
