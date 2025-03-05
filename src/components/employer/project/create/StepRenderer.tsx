
import BasicInformationForm from "../BasicInformationForm";
import TradeDetailsForm from "../TradeDetailsForm";
import ProjectSpecificationsForm from "../ProjectSpecificationsForm";
import LearnerRequirementsForm from "../LearnerRequirementsForm";
import MediaUploadsForm from "../MediaUploadsForm";
import ReviewForm from "../ReviewForm";
import { ProjectFormData } from "@/types/project";

interface StepRendererProps {
  currentStep: number;
  formData: Partial<ProjectFormData>;
  onStepSubmit: (data: Partial<ProjectFormData>) => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  onEdit: (step: number) => void;
  isEditMode?: boolean;
}

export const StepRenderer = ({
  currentStep,
  formData,
  onStepSubmit,
  onPublish,
  onSaveDraft,
  onEdit,
  isEditMode = false
}: StepRendererProps) => {
  switch (currentStep) {
    case 1:
      return (
        <BasicInformationForm
          formData={formData}
          onSubmit={onStepSubmit}
          isEditMode={isEditMode}
        />
      );
    case 2:
      return (
        <TradeDetailsForm
          formData={formData}
          onSubmit={onStepSubmit}
          isEditMode={isEditMode}
        />
      );
    case 3:
      return (
        <ProjectSpecificationsForm
          formData={formData}
          onSubmit={onStepSubmit}
          isEditMode={isEditMode}
        />
      );
    case 4:
      return (
        <LearnerRequirementsForm
          formData={formData}
          onSubmit={onStepSubmit}
          isEditMode={isEditMode}
        />
      );
    case 5:
      return (
        <MediaUploadsForm
          formData={formData}
          onSubmit={onStepSubmit}
          isEditMode={isEditMode}
        />
      );
    case 6:
      return (
        <ReviewForm
          data={formData}
          onPublish={onPublish}
          onSaveDraft={onSaveDraft}
          onEdit={onEdit}
        />
      );
    default:
      return <div>Step not found</div>;
  }
};
