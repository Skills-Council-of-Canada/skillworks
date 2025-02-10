
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ExperienceFormValues } from "@/types/educator";
import { UseFormReturn } from "react-hook-form";
import SkillLevelSection from "./company-preferences/SkillLevelSection";
import PreferredIndustriesSection from "./company-preferences/PreferredIndustriesSection";
import CompanyTypesSection from "./company-preferences/CompanyTypesSection";
import CompensationSection from "./company-preferences/CompensationSection";
import ScreeningQuestionsSection from "./company-preferences/ScreeningQuestionsSection";

interface CompanyPreferencesStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onNext: () => void;
}

const CompanyPreferencesStep = ({ form, onNext }: CompanyPreferencesStepProps) => {
  const { toast } = useToast();

  const handleNext = () => {
    if (!form.getValues("preferred_industries")?.length) {
      toast({
        title: "Industry Required",
        description: "Please select at least one preferred industry",
        variant: "destructive",
      });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SkillLevelSection form={form} />
        <PreferredIndustriesSection form={form} />
        <CompanyTypesSection form={form} />
        <CompensationSection form={form} />
        <ScreeningQuestionsSection form={form} />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext}>
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default CompanyPreferencesStep;
