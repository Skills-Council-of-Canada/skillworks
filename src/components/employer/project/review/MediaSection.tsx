
import ReviewSectionCard from "./ReviewSectionCard";
import type { ProjectFormData } from "@/types/project";

interface Props {
  data: Partial<ProjectFormData>;
  onEdit: () => void;
}

const MediaSection = ({ data, onEdit }: Props) => {
  return (
    <ReviewSectionCard
      title="Media"
      description="Project images and documents"
      onEdit={onEdit}
      isComplete={true}
    >
      <p><span className="font-medium">Images:</span> {data.images?.length || 0} uploaded</p>
      <p><span className="font-medium">Documents:</span> {data.documents?.length || 0} uploaded</p>
    </ReviewSectionCard>
  );
};

export default MediaSection;
