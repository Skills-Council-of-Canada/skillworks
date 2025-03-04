
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { useEffect, useCallback } from "react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext?: () => void; // Add onNext prop
}

const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  onBack,
  onNext 
}: StepNavigationProps) => {
  const isLastStep = currentStep === totalSteps;

  // Create a stable function reference
  const handleNextClick = useCallback(() => {
    console.log("Next button clicked", { currentStep, hasOnNext: !!onNext });
    
    if (onNext) {
      // Use the dedicated onNext handler if provided
      onNext();
    } else {
      // Fall back to submitting the form directly
      const formId = `step-${currentStep}-form`;
      console.log(`Looking for form with id ${formId}`);
      
      const form = document.getElementById(formId) as HTMLFormElement;
      if (form) {
        console.log(`Found form with id ${formId}, submitting it directly`);
        // Create and dispatch the submit event
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      } else {
        console.error(`Could not find form with id ${formId}`);
      }
    }
  }, [currentStep, onNext]);

  // Log on mount to help with debugging
  useEffect(() => {
    console.log(`StepNavigation mounted for step ${currentStep}/${totalSteps}`);
    return () => {
      console.log(`StepNavigation unmounting for step ${currentStep}`);
    };
  }, [currentStep, totalSteps]);

  return (
    <div className="flex justify-between mt-6">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onBack}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      {!isLastStep && (
        <Button
          type="button"
          size="sm"
          className="gap-1"
          onClick={handleNextClick}
          id={`next-button-step-${currentStep}`}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
