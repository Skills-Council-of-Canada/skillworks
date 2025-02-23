
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const learningAreas = [
  { id: "web_development", label: "Web Development" },
  { id: "mobile_development", label: "Mobile Development" },
  { id: "data_science", label: "Data Science" },
  { id: "cloud_computing", label: "Cloud Computing" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "ai_ml", label: "AI & Machine Learning" },
  { id: "devops", label: "DevOps" },
  { id: "blockchain", label: "Blockchain" }
] as const;

const profileSetupSchema = z.object({
  preferred_learning_areas: z.array(z.string()).min(1, "Select at least one learning area"),
  educational_background: z.string()
    .min(10, "Please provide more detail about your educational background")
    .max(500, "Educational background must be less than 500 characters"),
  skill_level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select your skill level",
  }),
  availability: z.enum(["part-time", "full-time"], {
    required_error: "Please select your availability",
  }),
});

type ProfileSetupFormValues = z.infer<typeof profileSetupSchema>;

interface ProfileSetupFormProps {
  onSubmit: (data: ProfileSetupFormValues) => void;
  onValidityChange: (isValid: boolean) => void;
}

export const ProfileSetupForm = ({ onSubmit, onValidityChange }: ProfileSetupFormProps) => {
  const form = useForm<ProfileSetupFormValues>({
    resolver: zodResolver(profileSetupSchema),
    mode: "onChange",
    defaultValues: {
      preferred_learning_areas: [],
      educational_background: "",
      skill_level: undefined,
      availability: undefined,
    },
  });

  React.useEffect(() => {
    const subscription = form.watch(() => {
      onValidityChange(form.formState.isValid);
    });
    return () => subscription.unsubscribe();
  }, [form, onValidityChange]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="preferred_learning_areas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Learning Areas</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const currentValues = field.value || [];
                    if (currentValues.includes(value)) {
                      field.onChange(currentValues.filter(v => v !== value));
                    } else {
                      field.onChange([...currentValues, value]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select learning areas" />
                  </SelectTrigger>
                  <SelectContent>
                    {learningAreas.map((area) => (
                      <SelectItem
                        key={area.id}
                        value={area.id}
                      >
                        {area.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Selected areas: {field.value?.map(v => 
                  learningAreas.find(a => a.id === v)?.label
                ).join(", ")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skill_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Level</FormLabel>
              <FormDescription>
                This helps us recommend appropriate learning experiences
              </FormDescription>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your skill level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="educational_background"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Educational Background</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your educational background, including any degrees, certifications, or relevant training..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This helps us better understand your learning journey
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <button type="submit" style={{ display: 'none' }} />
      </form>
    </Form>
  );
};
