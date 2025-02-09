
import React from 'react';

interface StepsProps {
  currentStep: number;
}

export const Steps: React.FC<StepsProps> = ({ currentStep }) => {
  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-4 left-0 w-full h-0.5 bg-muted">
        {/* Progress bar fill */}
        <div 
          className="absolute h-full bg-primary transition-all duration-300"
          style={{ width: `${(currentStep - 1) * 20}%` }}
        />
      </div>
      
      {/* Step circles */}
      <div className="relative flex justify-between">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div 
            key={step}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              transition-colors duration-200
              ${step === currentStep 
                ? 'bg-primary text-primary-foreground' 
                : step < currentStep 
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }
            `}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};
