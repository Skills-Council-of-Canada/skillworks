
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5, "Project title must be at least 5 characters"),
  description: z.string().min(50, "Project description must be at least 50 characters"),
});

type FormData = z.infer<typeof formSchema>;

const CreateProject = () => {
  const navigate = useNavigate();
  const [progress] = useState(33); // For the first step, it's 33% complete

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // This will be replaced with actual API call later
    console.log("Form submitted:", data);
    toast.success("Project details saved successfully!");
    // For now, navigate back to dashboard
    navigate("/employer");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-muted-foreground">
          Tell us about your project. Be as detailed as possible to attract the right candidates.
        </p>
      </div>

      <Progress value={progress} className="h-2" />
      
      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project title"
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
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project in detail..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/employer")}
              >
                Cancel
              </Button>
              <Button type="submit">
                Next Step
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProject;
