
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import type { ProjectFormData, TradeType, SkillLevel, ProjectTemplate } from "@/types/project";
import { PROJECT_TEMPLATES } from "@/types/project";
import ProjectTemplatesSection from "./trade-details/ProjectTemplatesSection";
import TradeDetailsFields from "./trade-details/TradeDetailsFields";

// Create a type that matches exactly what we need for this form
type TradeDetailsFormData = {
  tradeType: TradeType;
  subcategories: string[];
  skillLevel: SkillLevel;
  safetyRequirements: string[];
  toolsProvided: boolean;
  requiredTools: string[];
};

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
  const form = useForm<TradeDetailsFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tradeType: initialData.tradeType || 'Electrical',
      subcategories: initialData.subcategories || [],
      skillLevel: initialData.skillLevel || 'Pre-Apprentice',
      safetyRequirements: initialData.safetyRequirements || [],
      toolsProvided: initialData.toolsProvided || false,
      requiredTools: initialData.requiredTools || [],
    }
  });

  const applyTemplate = (template: ProjectTemplate) => {
    form.setValue('tradeType', template.tradeType);
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
