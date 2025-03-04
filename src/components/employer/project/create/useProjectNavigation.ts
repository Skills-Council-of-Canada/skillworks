
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type { ProjectFormData } from "@/types/project";
import { useCallback } from "react";

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

  const handleStepSubmit = useCallback((stepData: Partial<ProjectFormData>) => {
    console.log("Step submission received:", stepData, "Current step:", currentStep);
    
    setFormData(prev => {
      const updated = { ...prev, ...stepData };
      console.log("Updated form data:", updated);
      return updated;
    });
    
    // Move to next step immediately - no setTimeout to avoid potential issues
    if (currentStep < totalSteps) {
      console.log("Moving to next step:", currentStep + 1);
      setCurrentStep(currentStep + 1);
      toast({
        title: "Progress Saved",
        description: "Your changes have been saved successfully.",
      });
    }
  }, [currentStep, setCurrentStep, setFormData, toast, totalSteps]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/employer");
    }
  }, [currentStep, navigate, setCurrentStep]);

  // This function logs the current step for debugging
  const logCurrentStep = useCallback(() => {
    console.log(`Current step: ${currentStep}`, formData);
  }, [currentStep, formData]);

  return {
    handleStepSubmit,
    handleBack,
    logCurrentStep
  };
};
