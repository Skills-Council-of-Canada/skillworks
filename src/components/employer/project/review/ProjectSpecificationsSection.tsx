
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

  return (
    <ReviewSectionCard
      title="Project Specifications"
      description="Timeline, location, and positions"
      onEdit={onEdit}
      isComplete={isComplete}
    >
      <p><span className="font-medium">Duration:</span> {data.startDate?.toLocaleDateString()} - {data.endDate?.toLocaleDateString()}</p>
      <p><span className="font-medium">Location Type:</span> {data.locationType}</p>
      {data.address && <p><span className="font-medium">Address:</span> {data.address}</p>}
      <p><span className="font-medium">Positions Available:</span> {data.positions}</p>
    </ReviewSectionCard>
  );
};

export default ProjectSpecificationsSection;
