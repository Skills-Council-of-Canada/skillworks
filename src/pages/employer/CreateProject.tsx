
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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

const TOTAL_STEPS = 6;

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handlePublish, handleSaveDraft } = useProjectSubmission();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProjectFormData>>({});

  const handleStepSubmit = (stepData: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
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
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <StepProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      
      <div className="mt-8">
        {renderStep()}
      </div>

      <StepNavigation 
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onBack={handleBack}
      />
    </div>
  );
};

export default CreateProject;
