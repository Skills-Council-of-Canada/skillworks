
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const profileSetupSchema = z.object({
  preferredLearningAreas: z.array(z.string()).min(1, "Select at least one learning area"),
  educationalBackground: z.string().optional(),
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
  availability: z.enum(["part-time", "full-time"]),
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
      preferredLearningAreas: [],
      skillLevel: "beginner",
      availability: "full-time",
    },
  });

  form.watch();

  React.useEffect(() => {
    const isValid = form.formState.isValid;
    onValidityChange(isValid);
  }, [form.formState.isValid, onValidityChange]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="skillLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="educationalBackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Educational Background</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your educational background..."
                  {...field}
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
