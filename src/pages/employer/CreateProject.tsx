
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import type { ProjectFormData } from "@/types/project";
import BasicInformationForm from "@/components/employer/project/BasicInformationForm";
import TradeDetailsForm from "@/components/employer/project/TradeDetailsForm";
import ProjectSpecificationsForm from "@/components/employer/project/ProjectSpecificationsForm";
import LearnerRequirementsForm from "@/components/employer/project/LearnerRequirementsForm";
import MediaUploadsForm from "@/components/employer/project/MediaUploadsForm";
import ReviewForm from "@/components/employer/project/ReviewForm";
import StepProgress from "@/components/employer/project/create/StepProgress";
import StepNavigation from "@/components/employer/project/create/StepNavigation";
import { useProjectSubmission } from "@/hooks/useProjectSubmission";
import { Card } from "@/components/ui/card";

const TOTAL_STEPS = 6;

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { handlePublish, handleSaveDraft } = useProjectSubmission();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProjectFormData>>({});

  const handleStepSubmit = (stepData: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (currentStep < TOTAL_STEPS) {
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformationForm
            initialData={formData}
            onSubmit={handleStepSubmit}
          />
        );
      case 2:
        return (
          <TradeDetailsForm
            initialData={formData}
            onSubmit={handleStepSubmit}
          />
        );
      case 3:
        return (
          <ProjectSpecificationsForm
            initialData={formData}
            onSubmit={handleStepSubmit}
          />
        );
      case 4:
        return (
          <LearnerRequirementsForm
            initialData={formData}
            onSubmit={handleStepSubmit}
          />
        );
      case 5:
        return (
          <MediaUploadsForm
            initialData={formData}
            onSubmit={handleStepSubmit}
          />
        );
      case 6:
        return (
          <ReviewForm
            data={formData}
            onPublish={() => handlePublish(formData, user?.id!)}
            onSaveDraft={() => handleSaveDraft(formData, user?.id!)}
            onEdit={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className={`max-w-3xl mx-auto ${isMobile ? 'px-4' : 'px-6'} py-8 space-y-8`}>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Create New Project</h1>
          <p className="text-muted-foreground">
            Fill out the details below to create your new project. Your progress is automatically saved.
          </p>
        </div>

        <StepProgress 
          currentStep={currentStep} 
          totalSteps={TOTAL_STEPS} 
          className="mb-8"
        />
        
        <Card className="p-6">
          <div className="space-y-8" role="form" aria-label={`Project creation step ${currentStep} of ${TOTAL_STEPS}`}>
            {renderStep()}
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
