
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormLabel } from "@/components/ui/form";
import { X } from "lucide-react";
import { useState } from "react";

interface SubcategoriesInputProps {
  form: UseFormReturn<ExperienceFormValues>;
}

const SubcategoriesInput = ({ form }: SubcategoriesInputProps) => {
  const [newSubcategory, setNewSubcategory] = useState("");

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

  return (
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
  );
};

export default SubcategoriesInput;
