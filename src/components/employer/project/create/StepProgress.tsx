
import { Progress } from "@/components/ui/progress";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Create New Project</h1>
      <p className="text-muted-foreground">
        Tell us about your project. Be as detailed as possible to attract the right candidates.
      </p>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default StepProgress;
