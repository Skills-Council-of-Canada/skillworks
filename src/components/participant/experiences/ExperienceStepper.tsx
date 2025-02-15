
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ExperienceStepperProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  isStepValid: boolean;
  onSubmit: () => void;
  isLastStep: boolean;
  isSaving?: boolean;
  onSaveDraft: () => void;
}

export const ExperienceStepper = ({
  currentStep,
  onStepChange,
  isStepValid,
  onSubmit,
  isLastStep,
  isSaving,
  onSaveDraft
}: ExperienceStepperProps) => {
  const totalSteps = 6;

  return (
    <div className="space-y-4">
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="flex gap-4">
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
    </div>
  );
};
