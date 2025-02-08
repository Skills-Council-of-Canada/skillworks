
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import type { ProjectFormData, TradeType, SkillLevel, ProjectTemplate } from "@/types/project";
import { PROJECT_TEMPLATES } from "@/types/project";
import ProjectTemplatesSection from "./trade-details/ProjectTemplatesSection";
import TradeDetailsFields from "./trade-details/TradeDetailsFields";

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
        <ProjectTemplatesSection 
          templates={PROJECT_TEMPLATES} 
          onTemplateSelect={applyTemplate} 
        />

        <Separator className="my-6" />

        <TradeDetailsFields form={form} />
      </form>
    </Form>
  );
};

export default TradeDetailsForm;

