
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProjectFormData, TradeType, SkillLevel } from "@/types/project";

const tradeTypes: TradeType[] = ['Electrical', 'Plumbing', 'Carpentry', 'HVAC', 'Other'];
const skillLevels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

const formSchema = z.object({
  tradeType: z.enum(['Electrical', 'Plumbing', 'Carpentry', 'HVAC', 'Other'] as const),
  subcategories: z.array(z.string()).min(1, "Select at least one subcategory"),
  skillLevel: z.enum(['Beginner', 'Intermediate', 'Advanced'] as const),
});

interface Props {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

const TradeDetailsForm = ({ initialData, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tradeType: initialData.tradeType || 'Electrical',
      subcategories: initialData.subcategories || [],
      skillLevel: initialData.skillLevel || 'Beginner',
    },
  });

  return (
    <Form {...form}>
      <form
        id="step-2-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="tradeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trade Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trade type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tradeTypes.map((trade) => (
                    <SelectItem key={trade} value={trade}>
                      {trade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skillLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Level Required</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select required skill level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default TradeDetailsForm;
