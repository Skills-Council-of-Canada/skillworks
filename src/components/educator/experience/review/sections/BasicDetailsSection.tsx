
import { ExperienceFormValues } from "@/types/educator";
import ReviewSection from "./ReviewSection";

interface BasicDetailsSectionProps {
  values: ExperienceFormValues;
  onEdit: (step: string) => void;
}

const BasicDetailsSection = ({ values, onEdit }: BasicDetailsSectionProps) => {
  return (
    <ReviewSection
      title="Experience Details"
      onEdit={() => onEdit("details")}
    >
      <div className="space-y-2">
        <p><strong>Title:</strong> {values.title}</p>
        <p><strong>Description:</strong> {values.description}</p>
        {values.expected_outcomes?.length > 0 && (
          <div>
            <strong>Expected Outcomes:</strong>
            <ul className="list-disc list-inside">
              {values.expected_outcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ReviewSection>
  );
};

export default BasicDetailsSection;
