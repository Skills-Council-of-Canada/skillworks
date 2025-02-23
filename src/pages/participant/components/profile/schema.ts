
import * as z from "zod";

export const profileFormSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  preferred_contact: z.string().optional(),
  skill_level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  availability: z.string().min(1, "Please select availability"),
  educational_background: z.string().optional(),
  preferred_learning_areas: z.array(z.string()).optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
