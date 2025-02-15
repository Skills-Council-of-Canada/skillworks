
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RegistrationStepperProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  isStepValid: boolean;
  onSubmit: () => void;
  isLastStep: boolean;
}

export const RegistrationStepper = ({
  currentStep,
  onStepChange,
  isStepValid,
  onSubmit,
  isLastStep
}: RegistrationStepperProps) => {
  return (
    <div className="flex justify-between mt-6">
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
      <div className="flex-1" />
      <Button
        onClick={() => isLastStep ? onSubmit() : onStepChange(currentStep + 1)}
        disabled={!isStepValid}
        className="flex items-center"
      >
        {isLastStep ? (
          "Complete Registration"
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
