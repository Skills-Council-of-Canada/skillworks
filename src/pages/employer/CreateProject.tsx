
import { useState, useEffect } from "react";
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
const STORAGE_KEY = "project_form_data";

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { handlePublish, handleSaveDraft } = useProjectSubmission();
  
  // Load saved data from localStorage on initial render
  const loadSavedData = (): { step: number, data: Partial<ProjectFormData> } => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        
        // Convert date strings back to Date objects
        if (parsed.data.startDate) {
          parsed.data.startDate = new Date(parsed.data.startDate);
        }
        if (parsed.data.endDate) {
          parsed.data.endDate = new Date(parsed.data.endDate);
        }
        
        return parsed;
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }
    return { step: 1, data: {} };
  };
  
  const savedState = loadSavedData();
  const [currentStep, setCurrentStep] = useState(savedState.step);
  const [formData, setFormData] = useState<Partial<ProjectFormData>>(savedState.data);

  // Save to localStorage whenever form data or step changes
  useEffect(() => {
    try {
      // Create a copy of the data for serialization
      const dataToSave = { ...formData };
      
      // Convert Date objects to ISO strings for proper serialization
      if (dataToSave.startDate instanceof Date) {
        dataToSave.startDate = dataToSave.startDate.toISOString();
      }
      if (dataToSave.endDate instanceof Date) {
        dataToSave.endDate = dataToSave.endDate.toISOString();
      }
      
      // Don't save File objects as they can't be serialized
      if (dataToSave.images) {
        delete dataToSave.images;
      }
      if (dataToSave.documents) {
        delete dataToSave.documents;
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        step: currentStep,
        data: dataToSave
      }));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }, [formData, currentStep]);

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

  const handlePublishWithCleanup = () => {
    handlePublish(formData, user?.id!);
    // Clear saved data after successful submission
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSaveDraftWithCleanup = () => {
    handleSaveDraft(formData, user?.id!);
    // Clear saved data after successful submission
    localStorage.removeItem(STORAGE_KEY);
  };

  // This function logs the current step for debugging
  const logCurrentStep = () => {
    console.log(`Current step: ${currentStep}`, formData);
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
            onPublish={handlePublishWithCleanup}
            onSaveDraft={handleSaveDraftWithCleanup}
            onEdit={setCurrentStep}
          />
        );
      default:
        return null;
    }
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
