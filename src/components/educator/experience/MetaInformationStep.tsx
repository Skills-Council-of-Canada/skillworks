
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

// These could be moved to a constants file later
const MAIN_CATEGORIES = [
  "Engineering",
  "Business",
  "Healthcare",
  "Technology",
  "Manufacturing",
  "Construction",
  "Design",
  "Education",
] as const;

interface MetaInformationStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onNext: () => void;
}

const MetaInformationStep = ({ form, onNext }: MetaInformationStepProps) => {
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newSkillTag, setNewSkillTag] = useState("");

  const handleAddSubcategory = () => {
    if (!newSubcategory.trim()) return;
    
    const currentSubcategories = form.getValues("subcategories") || [];
    if (currentSubcategories.length >= 5) {
      return;
    }
    
    form.setValue("subcategories", [...currentSubcategories, newSubcategory.trim()]);
    setNewSubcategory("");
  };

  const handleRemoveSubcategory = (index: number) => {
    const currentSubcategories = form.getValues("subcategories") || [];
    form.setValue("subcategories", 
      currentSubcategories.filter((_, i) => i !== index)
    );
  };

  const handleAddSkillTag = () => {
    if (!newSkillTag.trim()) return;
    
    const currentTags = form.getValues("skill_tags") || [];
    if (currentTags.length >= 10) {
      return;
    }
    
    form.setValue("skill_tags", [...currentTags, newSkillTag.trim()]);
    setNewSkillTag("");
  };

  const handleRemoveSkillTag = (index: number) => {
    const currentTags = form.getValues("skill_tags") || [];
    form.setValue("skill_tags", 
      currentTags.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    const isValid = form.getValues("trade_category") && 
                   (form.getValues("skill_tags")?.length ?? 0) > 0;
    
    if (isValid) {
      onNext();
    } else {
      form.trigger(["trade_category", "skill_tags"]);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="trade_category"
        rules={{ required: "Main category is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Main Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select main category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {MAIN_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel>Subcategories (Max 5)</FormLabel>
        <div className="flex gap-2">
          <Input
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            placeholder="Add subcategory"
            onKeyPress={(e) => e.key === 'Enter' && handleAddSubcategory()}
          />
          <Button 
            type="button" 
            onClick={handleAddSubcategory}
            disabled={form.getValues("subcategories")?.length >= 5}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.getValues("subcategories")?.map((subcategory, index) => (
            <Badge key={index} variant="secondary">
              {subcategory}
              <button
                type="button"
                onClick={() => handleRemoveSubcategory(index)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <FormLabel>Skill Tags (Max 10)</FormLabel>
        <div className="flex gap-2">
          <Input
            value={newSkillTag}
            onChange={(e) => setNewSkillTag(e.target.value)}
            placeholder="Add skill tag"
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkillTag()}
          />
          <Button 
            type="button" 
            onClick={handleAddSkillTag}
            disabled={form.getValues("skill_tags")?.length >= 10}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.getValues("skill_tags")?.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveSkillTag(index)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <FormMessage>
          {(form.getValues("skill_tags")?.length ?? 0) === 0 && "At least one skill tag is required"}
        </FormMessage>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="button" onClick={handleSubmit}>
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default MetaInformationStep;
