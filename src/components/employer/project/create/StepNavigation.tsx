
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

const StepNavigation = ({ currentStep, totalSteps, onBack }: StepNavigationProps) => {
  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={onBack}
        className="flex items-center"
      >
        <ChevronLeft className="mr-2" />
        {currentStep === 1 ? "Cancel" : "Back"}
      </Button>
      
      {currentStep < totalSteps && (
        <Button
          type="submit"
          form={`step-${currentStep}-form`}
          className="flex items-center"
        >
          Next
          <ChevronRight className="ml-2" />
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
