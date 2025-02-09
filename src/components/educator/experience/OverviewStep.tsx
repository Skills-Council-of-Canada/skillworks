
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";

interface OverviewStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onNext: () => void;
}

const OverviewStep = ({ form, onNext }: OverviewStepProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Experience Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter experience name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the experience" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="trade_category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trade Category</FormLabel>
            <FormControl>
              <Input placeholder="Enter trade category" {...field} />
            </FormControl>
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
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select skill level" />
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
        name="duration_weeks"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration (Weeks)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min={1} 
                {...field}
                onChange={e => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end mt-6">
        <Button 
          type="button"
          onClick={onNext}
          disabled={!form.formState.isValid}
        >
          Next: Employer Details
        </Button>
      </div>
    </div>
  );
};

export default OverviewStep;
