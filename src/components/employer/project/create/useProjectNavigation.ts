
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type { ProjectFormData } from "@/types/project";
import { useCallback, useRef } from "react";

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
  // Use a ref to track if a step change is in progress
  const stepChangeInProgress = useRef(false);

  const handleStepSubmit = useCallback((stepData: Partial<ProjectFormData>) => {
    console.log("Step submission received:", stepData, "Current step:", currentStep);
    
    // Prevent multiple step changes from happening at once
    if (stepChangeInProgress.current) {
      console.log("Step change already in progress, ignoring");
      return;
    }
    
    stepChangeInProgress.current = true;
    
    try {
      // Update the form data with the new step data
      setFormData(prev => {
        const updated = { ...prev, ...stepData };
        console.log("Updated form data:", updated);
        return updated;
      });
      
      // Move to next step
      if (currentStep < totalSteps) {
        console.log(`Moving from step ${currentStep} to step ${currentStep + 1}`);
        setCurrentStep(currentStep + 1);
        toast({
          title: "Progress Saved",
          description: "Your changes have been saved successfully.",
        });
      } else {
        console.log("Already at last step, not advancing");
      }
    } finally {
      // Reset the lock after a short delay to ensure the state updates have time to process
      setTimeout(() => {
        stepChangeInProgress.current = false;
      }, 100);
    }
  }, [currentStep, setCurrentStep, setFormData, toast, totalSteps]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      console.log(`Moving back from step ${currentStep} to step ${currentStep - 1}`);
      setCurrentStep(currentStep - 1);
    } else {
      console.log("At first step, navigating to /employer");
      navigate("/employer");
    }
  }, [currentStep, navigate, setCurrentStep]);

  // This function is called when the Next button is clicked
  const handleNext = useCallback(() => {
    console.log(`Attempting to move from step ${currentStep} to next step`);
    
    // Find the form for the current step and submit it
    const formId = `step-${currentStep}-form`;
    const form = document.getElementById(formId) as HTMLFormElement;
    
    if (form) {
      console.log(`Found form with id ${formId}, submitting it`);
      
      // Create the submit event explicitly
      const submitEvent = new Event('submit', { 
        bubbles: true, 
        cancelable: true 
      });
      
      // Dispatch the event directly
      form.dispatchEvent(submitEvent);
      
      // Also try clicking the submit button as a fallback
      const submitButton = document.getElementById(`submit-form-step-${currentStep}`);
      if (submitButton) {
        console.log("Also clicking submit button as fallback");
        (submitButton as HTMLButtonElement).click();
      }
    } else {
      console.error(`Could not find form with id ${formId}`);
    }
  }, [currentStep]);
  
  // This function logs the current step for debugging
  const logCurrentStep = useCallback(() => {
    console.log(`Current step: ${currentStep}`, formData);
  }, [currentStep, formData]);

  return {
    handleStepSubmit,
    handleBack,
    handleNext,
    logCurrentStep
  };
};
