import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type { ProjectFormData } from "@/types/project";
import { useCallback, useRef, useEffect } from "react";

interface UseProjectNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: Partial<ProjectFormData>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ProjectFormData>>>;
  totalSteps: number;
  setIsProcessing?: (isProcessing: boolean) => void;
}

export const useProjectNavigation = ({
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
  totalSteps,
  setIsProcessing
}: UseProjectNavigationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // Use a ref to track if a step change is in progress
  const stepChangeInProgress = useRef(false);

  const handleStepSubmit = useCallback((stepData: Partial<ProjectFormData>) => {
    console.log("Step submission received:", stepData, "Current step:", currentStep);
    
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
    
    // Reset processing state
    if (setIsProcessing) {
      setTimeout(() => {
        setIsProcessing(false);
      }, 300);
    }
  }, [currentStep, setCurrentStep, setFormData, toast, totalSteps, setIsProcessing]);

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
    
    if (stepChangeInProgress.current) {
      console.log("Step change already in progress, ignoring next button click");
      return;
    }
    
    stepChangeInProgress.current = true;
    if (setIsProcessing) setIsProcessing(true);
    
    try {
      // Find the form for the current step and submit it
      const formId = `step-${currentStep}-form`;
      const form = document.getElementById(formId) as HTMLFormElement;
      
      if (form) {
        console.log(`Found form with id ${formId}, submitting it`);
        
        // Manually trigger the onSubmit handler for React Hook Form
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          console.log("Found submit button, clicking it");
          submitButton.click();
        } else {
          // Create and dispatch the submit event
          const submitEvent = new Event('submit', { 
            bubbles: true, 
            cancelable: true 
          });
          
          form.dispatchEvent(submitEvent);
        }
        
        // For MediaUploadsForm (step 5), we need a longer timeout as file uploads may take time
        const timeoutDuration = currentStep === 5 ? 5000 : 1000;
        
        // Reset the processing flag after a timeout if the form submission doesn't complete
        setTimeout(() => {
          if (stepChangeInProgress.current) {
            console.log(`Form submission for step ${currentStep} taking too long, resetting flags`);
            stepChangeInProgress.current = false;
            if (setIsProcessing) setIsProcessing(false);
          }
        }, timeoutDuration);
      } else {
        console.error(`Could not find form with id ${formId}`);
        stepChangeInProgress.current = false;
        if (setIsProcessing) setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      stepChangeInProgress.current = false;
      if (setIsProcessing) setIsProcessing(false);
    }
  }, [currentStep, setIsProcessing]);

  // Reset step change flag when the step changes
  useEffect(() => {
    stepChangeInProgress.current = false;
    if (setIsProcessing) setIsProcessing(false);
  }, [currentStep, setIsProcessing]);
  
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
