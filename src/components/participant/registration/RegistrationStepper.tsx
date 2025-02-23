
import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Step {
  label: string;
}

interface RegistrationStepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export const RegistrationStepper = ({
  steps,
  currentStep,
  onStepChange,
}: RegistrationStepperProps) => {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="space-y-4 mt-4">
      <Progress value={progress} className="h-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <button
              key={index}
              onClick={() => onStepChange(stepNumber)}
              className={`flex items-center gap-3 ${
                stepNumber <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
              disabled={stepNumber > currentStep}
              type="button"
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              ) : isCurrent ? (
                <CircleDot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              ) : (
                <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              )}
              <span className={`text-sm sm:text-base ${
                isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
