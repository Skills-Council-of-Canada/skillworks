
import { ExperienceFormValues } from "@/types/educator";
import ReviewSection from "./ReviewSection";

interface TimelineSectionProps {
  values: ExperienceFormValues;
  onEdit: (step: string) => void;
}

const TimelineSection = ({ values, onEdit }: TimelineSectionProps) => {
  return (
    <ReviewSection
      title="Timeline"
      onEdit={() => onEdit("timeline")}
    >
      <div className="space-y-2">
        <p><strong>Start Date:</strong> {new Date(values.start_date).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(values.end_date).toLocaleDateString()}</p>
        {values.milestones?.length > 0 && (
          <div>
            <strong>Milestones:</strong>
            <ul className="list-disc list-inside mt-1">
              {values.milestones.map((milestone, index) => (
                <li key={index}>
                  {milestone.title} - Due: {new Date(milestone.due_date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ReviewSection>
  );
};

export default TimelineSection;
