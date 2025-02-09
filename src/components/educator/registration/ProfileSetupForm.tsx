
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegistrationData } from "@/pages/educator/EducatorRegistration";

const specializations = [
  "Welding",
  "HVAC",
  "Electrical",
  "Plumbing",
  "Carpentry",
  "Automotive",
  "Other"
];

const areasOfInterest = [
  "Industry Partnerships",
  "Curriculum Development",
  "Technical Training",
  "Safety Protocols",
  "Student Mentoring",
  "Project Management",
  "Skills Assessment",
  "Professional Development"
];

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  institutionName: z.string().min(2, "Institution name is required"),
  specialization: z.string().min(1, "Please select a specialization"),
  yearsExperience: z.number().min(0, "Years of experience must be 0 or greater"),
  jobTitle: z.string().min(2, "Job title is required"),
  location: z.string().min(2, "Location is required"),
  areasOfInterest: z.array(z.string()).min(1, "Select at least one area of interest").max(5, "Maximum 5 areas allowed"),
});

interface ProfileSetupFormProps {
  onSubmit: (data: Partial<RegistrationData>) => void;
  initialData: Partial<RegistrationData>;
  isLoading: boolean;
}

const ProfileSetupForm = ({ onSubmit, initialData, isLoading }: ProfileSetupFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: initialData.fullName || "",
      institutionName: initialData.institutionName || "",
      specialization: initialData.specialization || "",
      yearsExperience: initialData.yearsExperience || 0,
      jobTitle: "",
      location: "",
      areasOfInterest: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="institutionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution / Trade School Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} placeholder="City, State/Province" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teaching Specialization</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a specialization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearsExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="areasOfInterest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Areas of Interest (Select up to 5)</FormLabel>
              <Select
                onValueChange={(value) => {
                  const currentValues = field.value || [];
                  if (currentValues.includes(value)) {
                    field.onChange(currentValues.filter(v => v !== value));
                  } else if (currentValues.length < 5) {
                    field.onChange([...currentValues, value]);
                  }
                }}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select areas of interest" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {areasOfInterest.map((area) => (
                    <SelectItem 
                      key={area} 
                      value={area}
                      disabled={field.value?.length >= 5 && !field.value?.includes(area)}
                    >
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2">
                {field.value?.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mr-2 mb-2"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default ProfileSetupForm;
