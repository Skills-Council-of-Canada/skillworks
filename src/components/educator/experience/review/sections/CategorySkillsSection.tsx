
import { ExperienceFormValues } from "@/types/educator";
import ReviewSection from "./ReviewSection";

interface CategorySkillsSectionProps {
  values: ExperienceFormValues;
  onEdit: (step: string) => void;
}

const CategorySkillsSection = ({ values, onEdit }: CategorySkillsSectionProps) => {
  return (
    <ReviewSection
      title="Category & Skills"
      onEdit={() => onEdit("category")}
    >
      <div className="space-y-2">
        <p><strong>Trade Category:</strong> {values.trade_category}</p>
        <p><strong>Skill Level:</strong> {values.skill_level}</p>
        {values.skill_tags?.length > 0 && (
          <div>
            <strong>Skills:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {values.skill_tags.map((tag, index) => (
                <span key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </ReviewSection>
  );
};

export default CategorySkillsSection;
