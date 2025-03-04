
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

const StepNavigation = ({ currentStep, totalSteps, onBack }: StepNavigationProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex justify-between w-full mt-4 max-w-full overflow-hidden">
      <Button
        variant="outline"
        onClick={onBack}
        className="flex items-center"
        size={isMobile ? "sm" : "default"}
      >
        <ChevronLeft className={isMobile ? "mr-0.5 h-4 w-4" : "mr-2"} />
        <span className="whitespace-nowrap text-xs sm:text-sm">{currentStep === 1 ? "Cancel" : "Back"}</span>
      </Button>
      
      {currentStep < totalSteps && (
        <Button
          type="submit"
          form={`step-${currentStep}-form`}
          className="flex items-center"
          size={isMobile ? "sm" : "default"}
        >
          <span className="whitespace-nowrap text-xs sm:text-sm">Next</span>
          <ChevronRight className={isMobile ? "ml-0.5 h-4 w-4" : "ml-2"} />
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
