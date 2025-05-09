
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useProjectSubmission } from "@/hooks/useProjectSubmission";
import { useProjectFormPersistence } from "@/hooks/employer/useProjectFormPersistence";
import { useProjectNavigation } from "@/components/employer/project/create/useProjectNavigation";
import { StepRenderer } from "@/components/employer/project/create/StepRenderer";
import StepProgress from "@/components/employer/project/create/StepProgress";
import StepNavigation from "@/components/employer/project/create/StepNavigation";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const TOTAL_STEPS = 6;

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { projectId } = useParams(); // Get projectId from URL params
  const isEditMode = Boolean(projectId); // Check if we're in edit mode
  const { handlePublish, handleSaveDraft, isSubmitting } = useProjectSubmission();
  const [isProcessingStep, setIsProcessingStep] = useState(false);
  
  const {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    clearSavedData,
    loadProjectData
  } = useProjectFormPersistence();

  const {
    handleStepSubmit,
    handleBack,
    handleNext,
    logCurrentStep
  } = useProjectNavigation({
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    totalSteps: TOTAL_STEPS,
    setIsProcessing: setIsProcessingStep
  });

  // Load project data if in edit mode
  useEffect(() => {
    if (isEditMode && projectId) {
      loadProjectData(projectId);
    }
  }, [isEditMode, projectId, loadProjectData]);

  // Log step changes for debugging
  useEffect(() => {
    console.log("Current step in CreateProject:", currentStep);
    logCurrentStep();
  }, [currentStep, logCurrentStep]);

  const handlePublishWithCleanup = async () => {
    try {
      await handlePublish(formData, user?.id!, projectId);
      // Only clear saved data after successful submission
      clearSavedData();
    } catch (error) {
      console.error("Error publishing project:", error);
      // Don't clear data on error
    }
  };

  const handleSaveDraftWithCleanup = async () => {
    try {
      await handleSaveDraft(formData, user?.id!, projectId);
      // Only clear saved data after successful submission
      clearSavedData();
    } catch (error) {
      console.error("Error saving draft:", error);
      // Don't clear data on error
    }
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <div className="w-full mx-auto px-2 sm:px-4 py-4 space-y-4 max-w-3xl">
        {isMobile && (
          <div className="space-y-2 max-w-full">
            <h1 className="text-xl font-bold tracking-tight">
              {isEditMode ? "Edit Project" : "Create New Project"}
            </h1>
            <p className="text-sm text-muted-foreground break-words">
              {isEditMode 
                ? "Update your project details below." 
                : "Fill out the details below to create your new project."}
            </p>
          </div>
        )}

        <StepProgress 
          currentStep={currentStep} 
          totalSteps={TOTAL_STEPS}
        />
        
        <Card className={`${isMobile ? 'p-3' : 'p-6'} w-full overflow-hidden`}>
          <div 
            className={`space-y-6 ${isMobile ? 'text-sm' : ''} max-w-full overflow-x-hidden`} 
            role="form" 
            aria-label={`Project ${isEditMode ? "editing" : "creation"} step ${currentStep} of ${TOTAL_STEPS}`}
          >
            <StepRenderer
              currentStep={currentStep}
              formData={formData}
              onStepSubmit={handleStepSubmit}
              onPublish={handlePublishWithCleanup}
              onSaveDraft={handleSaveDraftWithCleanup}
              onEdit={setCurrentStep}
              isEditMode={isEditMode}
            />
          </div>
        </Card>

        <StepNavigation 
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onBack={handleBack}
          onNext={handleNext}
          isProcessing={isProcessingStep || isSubmitting}
        />
      </div>
    </div>
  );
};

export default CreateProject;
