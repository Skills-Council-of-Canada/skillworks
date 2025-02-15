
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useExperienceSubmission, ExperienceFormValues } from '@/hooks/useExperienceSubmission';
import { ArrowLeft } from 'lucide-react';
import { ExperienceStepper } from "@/components/participant/experiences/ExperienceStepper";

const formSchema = z.object({
  // Step 1: Experience Details
  title: z.string().min(1, "Title is required").max(80, "Title must be less than 80 characters"),
  learner_capabilities: z.string()
    .min(50, "Please provide at least 2-3 sentences about learner capabilities")
    .max(1000, "Description is too long"),
  expected_outcomes: z.array(z.string())
    .min(1, "At least one expected outcome is required"),
  project_examples: z.array(z.string())
    .min(1, "At least one project example is required"),
  
  // ... will add validation for other steps later
  description: z.string().min(1, "Description is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  trade_category: z.string().optional(),
  subcategories: z.array(z.string()).optional(),
  skill_tags: z.array(z.string()).optional(),
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

const CreateParticipantExperience = () => {
  const navigate = useNavigate();
  const { submitExperience, isSubmitting } = useExperienceSubmission();
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      learner_capabilities: "",
      expected_outcomes: [],
      project_examples: [],
      start_date: new Date().toISOString().split('T')[0],
      trade_category: "",
      subcategories: [],
      skill_tags: [],
      media_urls: [],
      team_structure: "individual",
      team_size: 1,
      duration_hours: 40,
      learner_level: "beginner",
      max_learners: 1,
      milestones: []
    }
  });

  const isStepValid = () => {
    const currentValues = form.getValues();
    
    switch (currentStep) {
      case 1:
        return !!(
          currentValues.title &&
          currentValues.title.length <= 80 &&
          currentValues.learner_capabilities &&
          currentValues.learner_capabilities.length >= 50 &&
          currentValues.expected_outcomes?.length > 0 &&
          currentValues.project_examples?.length > 0
        );
      // ... will add validation for other steps
      default:
        return true;
    }
  };

  const onSubmit = async (data: ExperienceFormValues) => {
    await submitExperience(data);
  };

  const handleSaveDraft = async () => {
    const data = form.getValues();
    await submitExperience(data, 'draft');
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

      <Card className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Experience</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Title</FormLabel>
                      <FormDescription>
                        Enter a descriptive title for your experience (e.g., Digital Marketing Strategy)
                      </FormDescription>
                      <FormControl>
                        <Input 
                          placeholder="Enter experience title" 
                          {...field} 
                          maxLength={80}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="learner_capabilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learner Capabilities</FormLabel>
                      <FormDescription>
                        Provide an overview of what companies will gain from working with your learners
                      </FormDescription>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the capabilities and skills your learners will bring to projects..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expected_outcomes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Outcomes & Deliverables</FormLabel>
                      <FormDescription>
                        List the expected outcomes and deliverables (e.g., "Analyze a dataset", "Develop a marketing plan")
                      </FormDescription>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter each outcome on a new line" 
                          className="min-h-[100px]"
                          onChange={(e) => {
                            const outcomes = e.target.value.split('\n').filter(line => line.trim());
                            field.onChange(outcomes);
                          }}
                          value={field.value?.join('\n') || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project_examples"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Examples</FormLabel>
                      <FormDescription>
                        Provide examples of the types of projects learners can complete
                      </FormDescription>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter each project example on a new line" 
                          className="min-h-[100px]"
                          onChange={(e) => {
                            const examples = e.target.value.split('\n').filter(line => line.trim());
                            field.onChange(examples);
                          }}
                          value={field.value?.join('\n') || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <ExperienceStepper
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              isStepValid={isStepValid()}
              onSubmit={form.handleSubmit(onSubmit)}
              isLastStep={currentStep === 6}
              isSaving={isSubmitting}
              onSaveDraft={handleSaveDraft}
            />
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateParticipantExperience;
