
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BasicInformationForm from "@/components/employer/project/BasicInformationForm";
import TradeDetailsForm from "@/components/employer/project/TradeDetailsForm";
import ProjectSpecificationsForm from "@/components/employer/project/ProjectSpecificationsForm";
import LearnerRequirementsForm from "@/components/employer/project/LearnerRequirementsForm";
import MediaUploadsForm from "@/components/employer/project/MediaUploadsForm";
import ReviewForm from "@/components/employer/project/ReviewForm";
import type { ProjectFormData } from "@/types/project";

const TOTAL_STEPS = 6;

const CreateProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProjectFormData>>({});
  
  const progress = (currentStep / TOTAL_STEPS) * 100;

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

  const handlePublish = async () => {
    try {
      // TODO: Implement API call to save project
      toast.success("Project published successfully!");
      navigate("/employer");
    } catch (error) {
      toast.error("Failed to publish project. Please try again.");
    }
  };

  const handleSaveDraft = async () => {
    try {
      // TODO: Implement API call to save draft
      toast.success("Project saved as draft!");
      navigate("/employer");
    } catch (error) {
      toast.error("Failed to save draft. Please try again.");
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
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
            onEdit={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground">
          Tell us about your project. Be as detailed as possible to attract the right candidates.
        </p>
      </div>

      <Progress value={progress} className="h-2" />
      
      <div className="mt-8">
        {renderStep()}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2" />
          {currentStep === 1 ? "Cancel" : "Back"}
        </Button>
        
        {currentStep < TOTAL_STEPS && (
          <Button
            type="submit"
            form={`step-${currentStep}-form`}
            className="flex items-center"
          >
            Next
            <ChevronRight className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
