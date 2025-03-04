
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import type { ProjectFormData } from "@/types/project";
import { useIsMobile } from "@/hooks/use-mobile";
import ExampleProjects from "./basic-information/ExampleProjects";
import TitleField from "./basic-information/TitleField";
import DescriptionField from "./basic-information/DescriptionField";
import ActionButtons from "./basic-information/ActionButtons";

const formSchema = z.object({
  title: z.string()
    .min(5, "Project title must be at least 5 characters")
    .max(200, "Project title cannot exceed 200 characters"),
  description: z.string()
    .min(50, "Project description must be at least 50 characters"),
});

interface Props {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

const BasicInformationForm = ({ initialData, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
    },
  });
  
  const isMobile = useIsMobile();

  const handleGenerateProject = () => {
    console.log("Generate project clicked");
  };

  const handleUseTemplate = () => {
    console.log("Use template clicked");
  };

  return (
    <div className="space-y-6">
      <ExampleProjects />

      <Form {...form}>
        <form
          id="step-1-form"
          onSubmit={form.handleSubmit((data) => {
            console.log("Form submitted", data);
            onSubmit(data);
          })}
          className="space-y-6"
        >
          <TitleField form={form} />
          <DescriptionField 
            form={form} 
            initialDescription={initialData.description || ""}
          />
          <ActionButtons 
            onGenerateProject={handleGenerateProject}
            onUseTemplate={handleUseTemplate}
            isMobile={isMobile}
          />
        </form>
      </Form>
    </div>
  );
};

export default BasicInformationForm;
