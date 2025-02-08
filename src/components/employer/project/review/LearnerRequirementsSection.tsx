
import ReviewSectionCard from "./ReviewSectionCard";
import type { ProjectFormData } from "@/types/project";

interface Props {
  data: Partial<ProjectFormData>;
  onEdit: () => void;
}

const LearnerRequirementsSection = ({ data, onEdit }: Props) => {
  return (
    <ReviewSectionCard
      title="Learner Requirements"
      description="Certifications and safety requirements"
      onEdit={onEdit}
      isComplete={true}
    >
      <p><span className="font-medium">Tools Provided:</span> {data.toolsProvided ? "Yes" : "No"}</p>
      {data.certifications && data.certifications.length > 0 && (
        <p><span className="font-medium">Required Certifications:</span> {data.certifications.join(", ")}</p>
      )}
      {data.safetyRequirements && data.safetyRequirements.length > 0 && (
        <p><span className="font-medium">Safety Requirements:</span> {data.safetyRequirements.join(", ")}</p>
      )}
    </ReviewSectionCard>
  );
};

export default LearnerRequirementsSection;
