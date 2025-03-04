
import ReviewSectionCard from "./ReviewSectionCard";
import type { ProjectFormData } from "@/types/project";

interface Props {
  data: Partial<ProjectFormData>;
  onEdit: () => void;
}

const ProjectSpecificationsSection = ({ data, onEdit }: Props) => {
  const isComplete = Boolean(
    data.startDate && 
    data.endDate && 
    data.locationType && 
    data.positions && 
    (data.locationType !== 'On-site' || data.address)
  );

  // Format dates nicely if they exist
  const formatDate = (date?: Date) => {
    if (!date) return 'Not specified';
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <ReviewSectionCard
      title="Project Specifications"
      description="Timeline, location, and positions"
      onEdit={onEdit}
      isComplete={isComplete}
    >
      <div className="space-y-2">
        <p><span className="font-medium">Duration:</span> {formatDate(data.startDate)} - {formatDate(data.endDate)}</p>
        <p><span className="font-medium">Location Type:</span> {data.locationType || 'Not specified'}</p>
        {data.address && <p><span className="font-medium">Address:</span> {data.address}</p>}
        <p><span className="font-medium">Positions Available:</span> {data.positions || 'Not specified'}</p>
      </div>
    </ReviewSectionCard>
  );
};

export default ProjectSpecificationsSection;
