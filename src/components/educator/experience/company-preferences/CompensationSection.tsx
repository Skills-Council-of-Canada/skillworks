
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompensationSectionProps {
  form: UseFormReturn<ExperienceFormValues>;
}

const CompensationSection = ({ form }: CompensationSectionProps) => {
  const { watch, setValue } = form;

  return (
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
  );
};

export default CompensationSection;
