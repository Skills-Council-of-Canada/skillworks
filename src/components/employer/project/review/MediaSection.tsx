
import ReviewSectionCard from "./ReviewSectionCard";
import type { ProjectFormData } from "@/types/project";

interface Props {
  data: Partial<ProjectFormData>;
  onEdit: () => void;
}

const MediaSection = ({ data, onEdit }: Props) => {
  // Media section is considered complete even if no files are uploaded 
  // but we want to show the actual counts properly
  const imagesCount = data.images?.length || 0;
  const documentsCount = data.documents?.length || 0;
  
  return (
    <ReviewSectionCard
      title="Media"
      description="Project images and documents"
      onEdit={onEdit}
      isComplete={true}
    >
      <div className="space-y-2">
        <p><span className="font-medium">Images:</span> {imagesCount} uploaded</p>
        <p><span className="font-medium">Documents:</span> {documentsCount} uploaded</p>
      </div>
    </ReviewSectionCard>
  );
};

export default MediaSection;
