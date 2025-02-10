
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { X } from "lucide-react";
import { useState } from "react";

interface SkillTagsInputProps {
  form: UseFormReturn<ExperienceFormValues>;
}

const SkillTagsInput = ({ form }: SkillTagsInputProps) => {
  const [newSkillTag, setNewSkillTag] = useState("");

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

  return (
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
  );
};

export default SkillTagsInput;
