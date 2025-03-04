
import ReviewSectionCard from "./ReviewSectionCard";
import type { ProjectFormData } from "@/types/project";

interface Props {
  data: Partial<ProjectFormData>;
  onEdit: () => void;
}

const formatDescriptionText = (text: string | undefined) => {
  if (!text) return "";
  
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<u>$1</u>')
    .replace(/^• (.*)$/gm, '<div class="bullet-item">• $1</div>')
    .replace(/^(\d+)\. (.*)$/gm, '<div class="number-item">$1. $2</div>');
};

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
      <div 
        className="text-sm text-muted-foreground mt-2"
        dangerouslySetInnerHTML={{ __html: formatDescriptionText(data.description) }}
      />
    </ReviewSectionCard>
  );
};

export default BasicInfoSection;
