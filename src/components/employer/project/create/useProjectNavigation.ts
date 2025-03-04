
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type { ProjectFormData } from "@/types/project";

interface UseProjectNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: Partial<ProjectFormData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ProjectFormData>>>;
  totalSteps: number;
}

export const useProjectNavigation = ({
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
  totalSteps
}: UseProjectNavigationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStepSubmit = (stepData: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      toast({
        title: "Progress Saved",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate("/employer");
    }
  };

  // This function logs the current step for debugging
  const logCurrentStep = () => {
    console.log(`Current step: ${currentStep}`, formData);
  };

  return {
    handleStepSubmit,
    handleBack,
    logCurrentStep
  };
};
