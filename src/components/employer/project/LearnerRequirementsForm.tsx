
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
import { Switch } from "@/components/ui/switch";
import type { ProjectFormData } from "@/types/project";

const formSchema = z.object({
  certifications: z.array(z.string()),
  toolsProvided: z.boolean(),
  safetyRequirements: z.array(z.string()),
});

interface Props {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

const LearnerRequirementsForm = ({ initialData, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certifications: initialData.certifications || [],
      toolsProvided: initialData.toolsProvided || false,
      safetyRequirements: initialData.safetyRequirements || [],
    },
  });

  return (
    <Form {...form}>
      <form
        id="step-4-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="toolsProvided"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Tools Provided</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Will tools and equipment be provided for the learner?
                </div>
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
          name="safetyRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Safety Requirements</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter safety requirements"
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((item) => item.trim())
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default LearnerRequirementsForm;
