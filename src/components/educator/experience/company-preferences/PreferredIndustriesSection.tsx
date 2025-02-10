
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface PreferredIndustriesSectionProps {
  form: UseFormReturn<ExperienceFormValues>;
}

const PreferredIndustriesSection = ({ form }: PreferredIndustriesSectionProps) => {
  const { watch, setValue } = form;

  const industries = [
    "Construction",
    "Manufacturing",
    "Technology",
    "Healthcare",
    "Education",
    "Other"
  ];

  return (
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
  );
};

export default PreferredIndustriesSection;
