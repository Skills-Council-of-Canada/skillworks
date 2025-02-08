
import { UseFormReturn } from "react-hook-form";
import {
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TradeType, SkillLevel } from "@/types/project";

const tradeTypes: TradeType[] = ['Electrical', 'Plumbing', 'Carpentry', 'HVAC', 'Welding', 'Automotive', 'Other'];
const skillLevels: SkillLevel[] = ['Pre-Apprentice', 'Apprentice', 'Journeyman'];

type TradeDetailsFormData = {
  tradeType: TradeType;
  subcategories: string[];
  skillLevel: SkillLevel;
  safetyRequirements: string[];
  toolsProvided: boolean;
  requiredTools: string[];
};

interface Props {
  form: UseFormReturn<TradeDetailsFormData>;
}

const TradeDetailsFields = ({ form }: Props) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="tradeType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trade Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a trade type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-background border shadow-lg">
                {tradeTypes.map((trade) => (
                  <SelectItem key={trade} value={trade}>
                    {trade}
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
        name="skillLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skill Level Required</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select required skill level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-background border shadow-lg">
                {skillLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
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
        name="safetyRequirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Safety Requirements</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., steel-toed boots, hard hat (comma-separated)"
                value={field.value.join(", ")}
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
              />
            </FormControl>
            <FormDescription>
              List all required safety equipment and certifications
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="toolsProvided"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Tools Provided</FormLabel>
              <FormDescription>
                Will tools and equipment be provided for the learner?
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="requiredTools"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Required Tools</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., hammer, screwdriver set (comma-separated)"
                value={field.value.join(", ")}
                onChange={(e) =>
                  field.onChange(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
              />
            </FormControl>
            <FormDescription>
              List any tools the learner needs to bring
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TradeDetailsFields;
