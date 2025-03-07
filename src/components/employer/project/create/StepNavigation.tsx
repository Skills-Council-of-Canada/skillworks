
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { useEffect, useCallback, useState } from "react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext?: () => void; // Add onNext prop
  isProcessing?: boolean; // Add isProcessing prop
}

const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  onBack,
  onNext,
  isProcessing = false
}: StepNavigationProps) => {
  const isLastStep = currentStep === totalSteps;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset submitting state when step changes
  useEffect(() => {
    setIsSubmitting(false);
  }, [currentStep]);

  // Create a stable function reference
  const handleNextClick = useCallback(() => {
    console.log("Next button clicked", { currentStep, hasOnNext: !!onNext });
    
    if (isSubmitting || isProcessing) {
      console.log("Already submitting or processing, ignoring click");
      return;
    }
    
    setIsSubmitting(true);
    
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
        setIsSubmitting(false);
      }
    }
    
    // Reset submitting state after a timeout as a safety measure
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  }, [currentStep, onNext, isSubmitting, isProcessing]);

  return (
    <div className="flex justify-between mt-6">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onBack}
        className="gap-1"
        disabled={isSubmitting || isProcessing}
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
          disabled={isSubmitting || isProcessing}
        >
          {isSubmitting || isProcessing ? "Processing..." : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
