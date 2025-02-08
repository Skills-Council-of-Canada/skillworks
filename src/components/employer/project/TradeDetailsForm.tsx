
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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ProjectFormData, TradeType, SkillLevel, ProjectTemplate } from "@/types/project";
import { PROJECT_TEMPLATES } from "@/types/project";

const tradeTypes: TradeType[] = ['Electrical', 'Plumbing', 'Carpentry', 'HVAC', 'Welding', 'Automotive', 'Other'];
const skillLevels: SkillLevel[] = ['Pre-Apprentice', 'Apprentice', 'Journeyman'];

const formSchema = z.object({
  tradeType: z.enum(['Electrical', 'Plumbing', 'Carpentry', 'HVAC', 'Welding', 'Automotive', 'Other'] as const),
  subcategories: z.array(z.string()).min(1, "Select at least one subcategory"),
  skillLevel: z.enum(['Pre-Apprentice', 'Apprentice', 'Journeyman'] as const),
  safetyRequirements: z.array(z.string()),
  toolsProvided: z.boolean(),
  requiredTools: z.array(z.string()),
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
      skillLevel: initialData.skillLevel || 'Pre-Apprentice',
      safetyRequirements: initialData.safetyRequirements || [],
      toolsProvided: initialData.toolsProvided || false,
      requiredTools: initialData.requiredTools || [],
    },
  });

  const applyTemplate = (template: ProjectTemplate) => {
    form.setValue('tradeType', template.tradeType);
    // You could add more template applications here
  };

  return (
    <Form {...form}>
      <form
        id="step-2-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Project Templates</CardTitle>
            <CardDescription>
              Start with a template or create your own custom project
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECT_TEMPLATES.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:bg-accent" onClick={() => applyTemplate(template)}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <div className="space-y-6">
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

          <FormField
            control={form.control}
            name="safetyRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Safety Requirements</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., steel-toed boots, hard hat (comma-separated)"
                    value={field.value.join(", ")}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((item) => item.trim())
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  List all required safety equipment and certifications
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toolsProvided"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Tools Provided</FormLabel>
                  <FormDescription>
                    Will tools and equipment be provided for the learner?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requiredTools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Tools</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., hammer, screwdriver set (comma-separated)"
                    value={field.value.join(", ")}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((item) => item.trim())
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  List any tools the learner needs to bring
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default TradeDetailsForm;

