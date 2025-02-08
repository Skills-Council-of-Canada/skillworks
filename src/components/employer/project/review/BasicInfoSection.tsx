
import ReviewSectionCard from "./ReviewSectionCard";
import type { ProjectFormData } from "@/types/project";

interface Props {
  data: Partial<ProjectFormData>;
  onEdit: () => void;
}

const BasicInfoSection = ({ data, onEdit }: Props) => {
  const isComplete = Boolean(data.title && data.description);

  return (
    <ReviewSectionCard
      title="Basic Information"
      description="Project overview and description"
      onEdit={onEdit}
      isComplete={isComplete}
    >
      <h3 className="font-semibold">{data.title}</h3>
      <p className="text-sm text-muted-foreground mt-2">
        {data.description}
      </p>
    </ReviewSectionCard>
  );
};

export default BasicInfoSection;
