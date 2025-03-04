
import { useNavigate } from "react-router-dom";
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

const TOTAL_STEPS = 6;

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { handlePublish, handleSaveDraft } = useProjectSubmission();
  
  const {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    clearSavedData
  } = useProjectFormPersistence();

  const {
    handleStepSubmit,
    handleBack,
    logCurrentStep
  } = useProjectNavigation({
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    totalSteps: TOTAL_STEPS
  });

  const handlePublishWithCleanup = () => {
    handlePublish(formData, user?.id!);
    clearSavedData();
  };

  const handleSaveDraftWithCleanup = () => {
    handleSaveDraft(formData, user?.id!);
    clearSavedData();
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <div className="w-full mx-auto px-2 sm:px-4 py-4 space-y-4 max-w-3xl">
        {isMobile && (
          <div className="space-y-2 max-w-full">
            <h1 className="text-xl font-bold tracking-tight">
              Create New Project
            </h1>
            <p className="text-sm text-muted-foreground break-words">
              Fill out the details below to create your new project.
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
            aria-label={`Project creation step ${currentStep} of ${TOTAL_STEPS}`}
          >
            <StepRenderer
              currentStep={currentStep}
              formData={formData}
              onStepSubmit={handleStepSubmit}
              onPublish={handlePublishWithCleanup}
              onSaveDraft={handleSaveDraftWithCleanup}
              onEdit={setCurrentStep}
            />
          </div>
        </Card>

        <StepNavigation 
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default CreateProject;
