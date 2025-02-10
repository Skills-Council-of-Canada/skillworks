
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAIN_CATEGORIES = [
  "Engineering",
  "Business",
  "Healthcare",
  "Technology",
  "Manufacturing",
  "Construction",
  "Design",
  "Education",
] as const;

interface CategorySelectProps {
  form: UseFormReturn<ExperienceFormValues>;
}

const CategorySelect = ({ form }: CategorySelectProps) => {
  return (
    <FormField
      control={form.control}
      name="trade_category"
      rules={{ required: "Main category is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Main Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select main category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {MAIN_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategorySelect;
