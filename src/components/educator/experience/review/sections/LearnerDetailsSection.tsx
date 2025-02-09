
import { ExperienceFormValues } from "@/types/educator";
import ReviewSection from "./ReviewSection";

interface LearnerDetailsSectionProps {
  values: ExperienceFormValues;
  onEdit: (step: string) => void;
}

const LearnerDetailsSection = ({ values, onEdit }: LearnerDetailsSectionProps) => {
  return (
    <ReviewSection
      title="Learner Details"
      onEdit={() => onEdit("learners")}
    >
      <div className="space-y-2">
        <p><strong>Class Size:</strong> {values.class_size}</p>
        <p><strong>Team Size:</strong> {values.team_size}</p>
        <p><strong>Program Type:</strong> {values.program_type}</p>
        <p><strong>Team Structure:</strong> {values.team_structure}</p>
        <p><strong>Matching Type:</strong> {values.matching_type}</p>
      </div>
    </ReviewSection>
  );
};

export default LearnerDetailsSection;
