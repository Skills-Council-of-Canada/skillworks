
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";

interface EmployerStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onBack: () => void;
  onNext: () => void;
}

const EmployerStep = ({ onBack, onNext }: EmployerStepProps) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Employer collaboration features coming soon...
      </p>

      <div className="flex justify-between mt-6">
        <Button 
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="button"
          onClick={onNext}
        >
          Next: Student Assignment
        </Button>
      </div>
    </div>
  );
};

export default EmployerStep;
