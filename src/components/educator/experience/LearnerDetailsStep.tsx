
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LearnerDetailsStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onNext: () => void;
}

const programTypes = [
  { value: "diploma", label: "Diploma" },
  { value: "certificate", label: "Certificate" },
  { value: "bachelors", label: "Bachelor's Degree" },
];

const LearnerDetailsStep = ({ form, onNext }: LearnerDetailsStepProps) => {
  const teamStructure = form.watch("team_structure");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="program_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Program Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select program type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {programTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
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
        name="class_size"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Class Size</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Minimum 1 learner must be included
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="team_structure"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Team Structure</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="individual" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Individual
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="team" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Teams
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {teamStructure === "team" && (
        <FormField
          control={form.control}
          name="team_size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Team Size</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={2}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="matching_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Matching</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select matching type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="admin">Admin-assigned</SelectItem>
                <SelectItem value="self">Self-assigned</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end">
        <Button onClick={onNext}>Next Step</Button>
      </div>
    </div>
  );
};

export default LearnerDetailsStep;
