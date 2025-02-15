
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useExperienceSubmission } from '@/hooks/useExperienceSubmission';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  trade_category: z.string().optional(),
  subcategories: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
  expected_outcomes: z.array(z.string()).optional(),
  project_examples: z.array(z.any()).optional(),
  learner_capabilities: z.string().optional(),
  media_urls: z.array(z.string()).optional(),
  video_url: z.string().optional(),
  team_structure: z.string().optional(),
  team_size: z.number().optional(),
  preferred_companies: z.any().optional(),
  duration_hours: z.number().optional(),
  learner_level: z.string().optional(),
  max_learners: z.number().optional(),
  milestones: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    due_date: z.string()
  })).optional()
});

type FormValues = z.infer<typeof formSchema>;

const CreateParticipantExperience = () => {
  const navigate = useNavigate();
  const { submitExperience, isSubmitting } = useExperienceSubmission();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      start_date: new Date().toISOString().split('T')[0],
      trade_category: "",
      subcategories: [],
      skill_tags: [],
      expected_outcomes: [],
      project_examples: [],
      learner_capabilities: "",
      media_urls: [],
      team_structure: "individual",
      team_size: 1,
      duration_hours: 40,
      learner_level: "beginner",
      max_learners: 1,
      milestones: []
    }
  });

  const onSubmit = async (data: FormValues) => {
    await submitExperience(data);
  };

  return (
    <div className="container mx-auto p-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/participant/experiences')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Experiences
      </Button>

      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Experience</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter experience title" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your experience" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date (Optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/participant/experiences')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Experience"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateParticipantExperience;
