
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SkillLevelSectionProps {
  form: UseFormReturn<ExperienceFormValues>;
}

const SkillLevelSection = ({ form }: SkillLevelSectionProps) => {
  const { watch, setValue } = form;
  const watchSkillLevel = watch("skill_level");

  return (
    <div>
      <Label>Project Difficulty Level</Label>
      <RadioGroup
        defaultValue={watchSkillLevel}
        onValueChange={(value) => setValue("skill_level", value as "beginner" | "intermediate" | "advanced")}
        className="grid grid-cols-3 gap-4 mt-2"
      >
        <div>
          <RadioGroupItem value="beginner" id="beginner" className="peer sr-only" />
          <Label
            htmlFor="beginner"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span className="text-sm font-medium">Beginner</span>
            <span className="text-xs text-muted-foreground">Foundational skills</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="intermediate" id="intermediate" className="peer sr-only" />
          <Label
            htmlFor="intermediate"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span className="text-sm font-medium">Intermediate</span>
            <span className="text-xs text-muted-foreground">Basic experience</span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="advanced" id="advanced" className="peer sr-only" />
          <Label
            htmlFor="advanced"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <span className="text-sm font-medium">Advanced</span>
            <span className="text-xs text-muted-foreground">Experienced learners</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SkillLevelSection;
