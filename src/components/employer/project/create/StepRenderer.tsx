
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
          initialData={formData}
          onSubmit={onStepSubmit}
        />
      );
    case 2:
      return (
        <TradeDetailsForm
          initialData={formData}
          onSubmit={onStepSubmit}
        />
      );
    case 3:
      return (
        <ProjectSpecificationsForm
          initialData={formData}
          onSubmit={onStepSubmit}
        />
      );
    case 4:
      return (
        <LearnerRequirementsForm
          initialData={formData}
          onSubmit={onStepSubmit}
        />
      );
    case 5:
      return (
        <MediaUploadsForm
          initialData={formData}
          onSubmit={onStepSubmit}
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
