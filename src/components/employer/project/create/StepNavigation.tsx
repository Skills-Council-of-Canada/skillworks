
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";

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

  const handleNextClick = () => {
    console.log("Next button clicked");
    if (onNext) {
      onNext();
    } else {
      // Fall back to submitting the form directly
      const formId = `step-${currentStep}-form`;
      const form = document.getElementById(formId) as HTMLFormElement;
      if (form) {
        console.log(`Submitting form ${formId}`);
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      } else {
        console.error(`Could not find form with id ${formId}`);
      }
    }
  };

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
