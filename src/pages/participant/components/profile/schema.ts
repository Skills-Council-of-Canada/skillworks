
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  preferred_contact: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
