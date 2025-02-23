
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RegistrationNavigationProps {
  currentStep: number;
  isLastStep: boolean;
  isStepValid: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export const RegistrationNavigation = ({
  currentStep,
  isLastStep,
  isStepValid,
  isSubmitting,
  onBack,
  onSubmit,
}: RegistrationNavigationProps) => {
  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}
      <Button
        type="submit"
        className="ml-auto"
        disabled={!isStepValid || isSubmitting}
        onClick={onSubmit}
      >
        {isLastStep ? (
          isSubmitting ? "Registering..." : "Complete Registration"
        ) : (
          <>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};
