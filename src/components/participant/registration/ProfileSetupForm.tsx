
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
import { Checkbox } from "@/components/ui/checkbox";

const learningAreas = [
  { id: "web_development", label: "Web Development" },
  { id: "mobile_development", label: "Mobile Development" },
  { id: "data_science", label: "Data Science" },
  { id: "cloud_computing", label: "Cloud Computing" },
  { id: "cybersecurity", label: "Cybersecurity" }
] as const;

const profileSetupSchema = z.object({
  skill_level: z.enum(["beginner", "intermediate", "advanced"]),
  availability: z.enum(["part-time", "full-time"]),
  educational_background: z.string().min(1, "Educational background is required"),
  preferred_learning_areas: z.array(z.string()).min(1, "Select at least one learning area"),
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
      skill_level: "beginner",
      availability: "full-time",
      educational_background: "",
      preferred_learning_areas: [],
    },
  });

  React.useEffect(() => {
    const subscription = form.watch(() => {
      onValidityChange(form.formState.isValid);
    });
    return () => subscription.unsubscribe();
  }, [form, onValidityChange]);

  const handleSubmit = (data: ProfileSetupFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="skill_level"
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
          name="preferred_learning_areas"
          render={() => (
            <FormItem>
              <FormLabel>Preferred Learning Areas</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {learningAreas.map((area) => (
                  <FormField
                    key={area.id}
                    control={form.control}
                    name="preferred_learning_areas"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={area.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(area.id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), area.id]
                                  : field.value?.filter((value) => value !== area.id) || [];
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {area.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
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
                  placeholder="Tell us about your educational background..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button type="submit" style={{ display: 'none' }} />
      </form>
    </Form>
  );
};
