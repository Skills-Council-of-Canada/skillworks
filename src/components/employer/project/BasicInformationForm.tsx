
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

  const handleGenerateProject = () => {
    // TODO: Implement AI project generation
    console.log("Generate project clicked");
  };

  const handleUseTemplate = () => {
    // TODO: Implement template selection
    console.log("Use template clicked");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-muted/50">
        <h3 className="font-semibold mb-2">Example Projects</h3>
        <ul className="space-y-2 text-muted-foreground">
          {EXAMPLE_PROJECTS.map((example, index) => (
            <li key={index} className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 text-primary" />
              {example}
            </li>
          ))}
        </ul>
      </Card>

      <Form {...form}>
        <form
          id="step-1-form"
          onSubmit={form.handleSubmit(onSubmit)}
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
                  <textarea
                    className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe your project in detail..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleGenerateProject}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Generate Project
            </Button>
            <Button
              type="submit"
              variant="secondary"
            >
              Create Project from Scratch
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleUseTemplate}
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
