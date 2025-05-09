
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;
  const isMobile = useIsMobile();

  return (
    <div className="space-y-2 w-full max-w-full overflow-hidden">
      {!isMobile && (
        <>
          <h1 className="text-2xl font-bold">Create New Project</h1>
          <p className="text-base text-muted-foreground break-words">
            Tell us about your project. Be as detailed as possible to attract the right candidates.
          </p>
        </>
      )}
      {isMobile && (
        <p className="text-sm text-muted-foreground break-words">
          <span>Step {currentStep} of {totalSteps}</span>
        </p>
      )}
      <Progress value={progress} className="h-2 w-full" />
    </div>
  );
};

export default StepProgress;
