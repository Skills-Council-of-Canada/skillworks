
import { Check } from "lucide-react";

interface StepsProps {
  currentStep: number;
}

export const Steps = ({ currentStep }: StepsProps) => {
  const steps = [
    { number: 1, title: "Profile Setup" },
    { number: 2, title: "Contact & Verification" },
    { number: 3, title: "Account Setup" },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-muted" />
      </div>
      <div className="relative flex justify-between">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center"
            >
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background
                  ${isCompleted ? 'border-primary bg-primary text-primary-foreground' : 
                    isCurrent ? 'border-primary' : 'border-muted'}
                `}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className={`text-sm ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.number}
                  </span>
                )}
              </div>
              <p className={`mt-2 text-sm ${isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {step.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
