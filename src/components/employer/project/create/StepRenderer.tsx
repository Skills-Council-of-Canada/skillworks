
import { ReactNode } from "react";
import type { ProjectFormData } from "@/types/project";
import BasicInformationForm from "../BasicInformationForm";
import TradeDetailsForm from "../TradeDetailsForm";
import ProjectSpecificationsForm from "../ProjectSpecificationsForm";
import LearnerRequirementsForm from "../LearnerRequirementsForm";
import MediaUploadsForm from "../MediaUploadsForm";
import ReviewForm from "../ReviewForm";

interface StepRendererProps {
  currentStep: number;
  formData: Partial<ProjectFormData>;
  onStepSubmit: (stepData: Partial<ProjectFormData>) => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  onEdit: (step: number) => void;
}

export const StepRenderer = ({
  currentStep,
  formData,
  onStepSubmit,
  onPublish,
  onSaveDraft,
  onEdit
}: StepRendererProps): ReactNode => {
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
      return null;
  }
};
