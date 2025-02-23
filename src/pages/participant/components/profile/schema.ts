
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  preferred_contact: z.string().optional(),
  skill_level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  availability: z.string(),
  preferred_learning_areas: z.array(z.string()),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
