
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "../schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SkillsSectionProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const SkillsSection = ({ form }: SkillsSectionProps) => {
  // This component is currently unused as skill_level and availability
  // are not part of the current schema
  return null;
};
