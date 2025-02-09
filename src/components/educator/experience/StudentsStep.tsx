
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";

interface StudentsStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const StudentsStep = ({ onBack, onSubmit, isSubmitting }: StudentsStepProps) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Student assignment features coming soon...
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
          type="submit"
          disabled={isSubmitting}
          onClick={onSubmit}
        >
          Create Experience
        </Button>
      </div>
    </div>
  );
};

export default StudentsStep;
