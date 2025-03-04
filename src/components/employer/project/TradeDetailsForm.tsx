
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { ProjectFormData, TradeType, SkillLevel, ProjectTemplate } from "@/types/project";
import { PROJECT_TEMPLATES } from "@/types/project";
import ProjectTemplatesSection from "./trade-details/ProjectTemplatesSection";
import TradeDetailsFields from "./trade-details/TradeDetailsFields";
import { useEffect } from "react";

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

  // Log when the form is mounted to help with debugging
  useEffect(() => {
    console.log("TradeDetailsForm mounted with initialData:", initialData);
    // Pre-populate subcategories with at least one empty string to satisfy validation
    if (!initialData.subcategories || initialData.subcategories.length === 0) {
      form.setValue('subcategories', ['General']);
    }
  }, []);

  const applyTemplate = (template: ProjectTemplate) => {
    console.log("Applying template:", template);
    form.setValue('tradeType', template.tradeType);
    
    // Safely access optional properties using optional chaining
    if (template.subcategories && template.subcategories.length > 0) {
      form.setValue('subcategories', template.subcategories);
    }
    
    if (template.skillLevel) {
      form.setValue('skillLevel', template.skillLevel);
    }
  };

  const handleSubmit = (data: TradeDetailsFormData) => {
    console.log("TradeDetailsForm submitted successfully:", data);
    // Call the onSubmit prop to pass the data up
    onSubmit(data);
  };

  // Log form state for debugging
  const formState = form.formState;
  console.log("Form state:", { 
    isDirty: formState.isDirty,
    isValid: formState.isValid, 
    errors: formState.errors
  });

  // Force form validation on mount
  useEffect(() => {
    form.trigger();
  }, [form]);

  return (
    <Form {...form}>
      <form
        id="step-2-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <ProjectTemplatesSection 
          templates={PROJECT_TEMPLATES} 
          onTemplateSelect={applyTemplate} 
        />

        <Separator className="my-6" />

        <TradeDetailsFields form={form} />
        
        {/* Add a visible submit button for testing/debugging */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="hidden md:inline-flex" 
            id="debug-submit-btn-step-2"
          >
            Submit Form
          </Button>
        </div>

        {/* Hidden submit button that will be triggered by the Next button */}
        <Button type="submit" className="hidden" id="submit-form-step-2">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default TradeDetailsForm;
