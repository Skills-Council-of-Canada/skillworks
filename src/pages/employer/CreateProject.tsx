
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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { ProjectFormData } from "@/types/project";

const TOTAL_STEPS = 6;

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
      // First, get the employer_id for the current user
      const { data: employerData, error: employerError } = await supabase
        .from('employers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (employerError) throw employerError;

      // Create the project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
          employer_id: employerData.id,
          title: formData.title,
          description: formData.description,
          trade_type: formData.tradeType,
          skill_level: formData.skillLevel,
          start_date: formData.startDate,
          end_date: formData.endDate,
          location_type: formData.locationType,
          site_address: formData.address,
          positions: formData.positions,
          flexibility: formData.flexibility,
          safety_requirements: formData.safetyRequirements,
          status: 'published'
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Handle media uploads if any
      if (formData.images?.length || formData.documents?.length) {
        const uploadPromises = [];

        // Upload images
        if (formData.images?.length) {
          for (const image of formData.images) {
            const formData = new FormData();
            formData.append('file', image);
            formData.append('type', 'image');
            formData.append('projectId', projectData.id);

            uploadPromises.push(
              supabase.functions.invoke('upload-project-files', {
                body: formData,
              })
            );
          }
        }

        // Upload documents
        if (formData.documents?.length) {
          for (const document of formData.documents) {
            const formData = new FormData();
            formData.append('file', document);
            formData.append('type', 'document');
            formData.append('projectId', projectData.id);

            uploadPromises.push(
              supabase.functions.invoke('upload-project-files', {
                body: formData,
              })
            );
          }
        }

        await Promise.all(uploadPromises);
      }

      toast.success("Project published successfully!");
      navigate("/employer");
    } catch (error) {
      console.error('Error publishing project:', error);
      toast.error("Failed to publish project. Please try again.");
    }
  };

  const handleSaveDraft = async () => {
    try {
      // Similar to handlePublish but with status 'draft'
      const { data: employerData, error: employerError } = await supabase
        .from('employers')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (employerError) throw employerError;

      await supabase
        .from('projects')
        .insert({
          employer_id: employerData.id,
          title: formData.title,
          description: formData.description,
          trade_type: formData.tradeType,
          skill_level: formData.skillLevel,
          start_date: formData.startDate,
          end_date: formData.endDate,
          location_type: formData.locationType,
          site_address: formData.address,
          positions: formData.positions,
          flexibility: formData.flexibility,
          safety_requirements: formData.safetyRequirements,
          status: 'draft'
        });

      toast.success("Project saved as draft!");
      navigate("/employer");
    } catch (error) {
      console.error('Error saving draft:', error);
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
