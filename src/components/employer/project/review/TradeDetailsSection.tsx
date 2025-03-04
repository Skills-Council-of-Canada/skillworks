
import ReviewSectionCard from "./ReviewSectionCard";
import type { ProjectFormData } from "@/types/project";

interface Props {
  data: Partial<ProjectFormData>;
  onEdit: () => void;
}

const TradeDetailsSection = ({ data, onEdit }: Props) => {
  const isComplete = Boolean(data.tradeType && data.skillLevel);

  return (
    <ReviewSectionCard
      title="Trade Details"
      description="Trade type and skill requirements"
      onEdit={onEdit}
      isComplete={isComplete}
    >
      <div className="space-y-2">
        <p>
          <span className="font-medium">Trade Type:</span> 
          {data.tradeType || <span className="text-destructive text-sm">Required</span>}
        </p>
        <p>
          <span className="font-medium">Skill Level:</span> 
          {data.skillLevel || <span className="text-destructive text-sm">Required</span>}
        </p>
        {data.subcategories && data.subcategories.length > 0 && (
          <p><span className="font-medium">Subcategories:</span> {data.subcategories.join(", ")}</p>
        )}
      </div>
    </ReviewSectionCard>
  );
};

export default TradeDetailsSection;
