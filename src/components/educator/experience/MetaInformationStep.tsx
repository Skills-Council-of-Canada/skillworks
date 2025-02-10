
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Button } from "@/components/ui/button";
import CategorySelect from "./meta-information/CategorySelect";
import SubcategoriesInput from "./meta-information/SubcategoriesInput";
import SkillTagsInput from "./meta-information/SkillTagsInput";

interface MetaInformationStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onNext: () => void;
}

const MetaInformationStep = ({ form, onNext }: MetaInformationStepProps) => {
  const handleSubmit = () => {
    const isValid = form.getValues("trade_category") && 
                   (form.getValues("skill_tags")?.length ?? 0) > 0;
    
    if (isValid) {
      onNext();
    } else {
      form.trigger(["trade_category", "skill_tags"]);
    }
  };

  return (
    <div className="space-y-6">
      <CategorySelect form={form} />
      <SubcategoriesInput form={form} />
      <SkillTagsInput form={form} />

      <div className="flex justify-end mt-6">
        <Button type="button" onClick={handleSubmit}>
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default MetaInformationStep;
