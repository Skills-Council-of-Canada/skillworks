
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
      <div className="space-y-3">
        {data.title ? (
          <h3 className="font-semibold text-lg">{data.title}</h3>
        ) : (
          <p className="text-destructive">Title required</p>
        )}
        {data.description ? (
          <div 
            className="text-sm text-muted-foreground prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        ) : (
          <p className="text-destructive">Description required</p>
        )}
      </div>
    </ReviewSectionCard>
  );
};

export default BasicInfoSection;
