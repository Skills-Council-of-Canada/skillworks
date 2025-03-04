
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ProjectFormData } from "@/types/project";
import { useIsMobile } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

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

const EXAMPLE_PROJECTS = [
  "Install electrical wiring for a residential project",
  "Complete plumbing installation for a commercial kitchen",
  "Renovate and upgrade HVAC system in an office building",
];

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
    // TODO: Implement AI project generation
    console.log("Generate project clicked");
  };

  const handleUseTemplate = () => {
    // TODO: Implement template selection
    console.log("Use template clicked");
  };

  useEffect(() => {
    console.log("BasicInformationForm rendered, using form ID: step-1-form");
  }, []);

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-6 bg-[#F1F1F1]">
        <h3 className="font-semibold mb-2">Example Projects</h3>
        <ul className="space-y-2 text-muted-foreground max-w-full">
          {EXAMPLE_PROJECTS.map((example, index) => (
            <li key={index} className="flex items-start break-words">
              <AlertCircle className="h-5 w-5 mr-2 shrink-0 text-primary" />
              <span className="inline-block">{example}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Form {...form}>
        <form
          id="step-1-form"
          onSubmit={form.handleSubmit((data) => {
            console.log("Form submitted", data);
            onSubmit(data);
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Objective</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Write a short, clear objective for your project"
                    maxLength={200}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Details</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[150px] w-full"
                    placeholder="Describe your project in detail..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
            <Button
              type="button"
              onClick={handleGenerateProject}
              className="bg-orange-500 hover:bg-orange-600"
              size={isMobile ? "sm" : "default"}
            >
              Generate Project
            </Button>
            <Button
              type="submit"
              variant="secondary"
              size={isMobile ? "sm" : "default"}
              className="whitespace-normal text-left h-auto py-2"
            >
              Create Project from Scratch
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleUseTemplate}
              size={isMobile ? "sm" : "default"}
            >
              Use Template
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BasicInformationForm;
