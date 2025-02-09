
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExperienceFormValues } from "@/types/educator";
import { UseFormReturn } from "react-hook-form";
import { Plus, X } from "lucide-react";

interface CompanyPreferencesStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onNext: () => void;
}

const CompanyPreferencesStep = ({ form, onNext }: CompanyPreferencesStepProps) => {
  const { toast } = useToast();
  const { register, watch, setValue, formState: { errors } } = form;

  const industries = [
    "Construction",
    "Manufacturing",
    "Technology",
    "Healthcare",
    "Education",
    "Other"
  ];

  const companyTypes = [
    "Startup",
    "Small Business",
    "Mid-size Company",
    "Enterprise",
    "Non-profit"
  ];

  const watchSkillLevel = watch("skill_level");
  const watchScreeningQuestions = watch("screening_questions") || [];

  const addScreeningQuestion = () => {
    const currentQuestions = form.getValues("screening_questions") || [];
    setValue("screening_questions", [...currentQuestions, { question: "", required: false }]);
  };

  const removeScreeningQuestion = (index: number) => {
    const currentQuestions = form.getValues("screening_questions") || [];
    setValue("screening_questions", currentQuestions.filter((_, i) => i !== index));
  };

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

        <div>
          <Label>Preferred Industries</Label>
          <Select
            onValueChange={(value) => {
              const current = form.getValues("preferred_industries") || [];
              if (!current.includes(value)) {
                setValue("preferred_industries", [...current, value]);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industries" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {watch("preferred_industries")?.map((industry, index) => (
              <Card key={index} className="p-2 flex items-center gap-2">
                {industry}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const current = form.getValues("preferred_industries");
                    setValue(
                      "preferred_industries",
                      current.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Label>Company Types</Label>
          <Select
            onValueChange={(value) => {
              const current = form.getValues("company_types") || [];
              if (!current.includes(value)) {
                setValue("company_types", [...current, value]);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select company types" />
            </SelectTrigger>
            <SelectContent>
              {companyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {watch("company_types")?.map((type, index) => (
              <Card key={index} className="p-2 flex items-center gap-2">
                {type}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const current = form.getValues("company_types");
                    setValue(
                      "company_types",
                      current.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Label>Compensation Model</Label>
          <Select
            onValueChange={(value) => setValue("compensation_type", value)}
            defaultValue={watch("compensation_type")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select compensation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unpaid">Unpaid, academic credit only</SelectItem>
              <SelectItem value="hourly">Hourly wage</SelectItem>
              <SelectItem value="flat_fee">Flat fee</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Screening Questions</Label>
            <Button type="button" variant="outline" size="sm" onClick={addScreeningQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
          <div className="space-y-4">
            {watchScreeningQuestions.map((_, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Enter your question"
                      {...register(`screening_questions.${index}.question`)}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register(`screening_questions.${index}.required`)}
                        id={`required-${index}`}
                      />
                      <Label htmlFor={`required-${index}`}>Required</Label>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeScreeningQuestion(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
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
