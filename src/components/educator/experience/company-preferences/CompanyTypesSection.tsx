
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface CompanyTypesSectionProps {
  form: UseFormReturn<ExperienceFormValues>;
}

const CompanyTypesSection = ({ form }: CompanyTypesSectionProps) => {
  const { watch, setValue } = form;

  const companyTypes = [
    "Startup",
    "Small Business",
    "Mid-size Company",
    "Enterprise",
    "Non-profit"
  ];

  return (
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
  );
};

export default CompanyTypesSection;
