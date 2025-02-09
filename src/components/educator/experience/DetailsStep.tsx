
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Plus, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface DetailsStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onNext: () => void;
}

const exampleProjectSuggestions = [
  {
    title: "Basic Home Renovation",
    description: "Complete a basic home renovation project including painting, flooring, and minor repairs."
  },
  {
    title: "Commercial Space Redesign",
    description: "Redesign a small commercial space focusing on layout optimization and interior finishing."
  }
];

const DetailsStep = ({ form, onNext }: DetailsStepProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      form.setValue('media', [...(form.getValues('media') || []), ...files]);
      toast({
        title: "Files added",
        description: `${files.length} file(s) have been added to the experience.`,
      });
    } catch (error) {
      toast({
        title: "Error adding files",
        description: "There was an error adding your files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const addOutcome = () => {
    const currentOutcomes = form.getValues('expected_outcomes') || [];
    form.setValue('expected_outcomes', [...currentOutcomes, '']);
  };

  const removeOutcome = (index: number) => {
    const currentOutcomes = form.getValues('expected_outcomes') || [];
    form.setValue('expected_outcomes', currentOutcomes.filter((_, i) => i !== index));
  };

  const addExampleProject = () => {
    const currentProjects = form.getValues('example_projects') || [];
    form.setValue('example_projects', [...currentProjects, { title: '', description: '' }]);
  };

  const useExampleProject = (project: typeof exampleProjectSuggestions[0]) => {
    const currentProjects = form.getValues('example_projects') || [];
    form.setValue('example_projects', [...currentProjects, project]);
  };

  const validateForm = () => {
    const values = form.getValues();
    if (!values.title || !values.description) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return false;
    }
    if (!values.expected_outcomes?.length || values.expected_outcomes.some(outcome => !outcome)) {
      toast({
        title: "Expected Outcomes Required",
        description: "Please add at least one expected outcome.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Experience Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter a clear, descriptive title" {...field} />
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
                placeholder="Describe the learning objectives and experience goals (2-3 sentences)"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel>Expected Outcomes</FormLabel>
          <Button type="button" variant="outline" size="sm" onClick={addOutcome}>
            <Plus className="w-4 h-4 mr-2" />
            Add Outcome
          </Button>
        </div>
        
        {form.getValues('expected_outcomes')?.map((outcome, index) => (
          <div key={index} className="flex gap-2">
            <FormField
              control={form.control}
              name={`expected_outcomes.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Enter an expected outcome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeOutcome(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <FormLabel>Example Projects</FormLabel>
          <Button type="button" variant="outline" size="sm" onClick={addExampleProject}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {exampleProjectSuggestions.map((project, index) => (
            <Card key={index} className="p-4">
              <h4 className="font-semibold">{project.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => useExampleProject(project)}
              >
                Use This Example
              </Button>
            </Card>
          ))}
        </div>

        {form.getValues('example_projects')?.map((project, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <FormField
              control={form.control}
              name={`example_projects.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`example_projects.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <FormLabel>Media Attachments</FormLabel>
        <Card className="p-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                Images, videos, or documents
              </p>
            </div>
            <Input
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
          </label>
          
          {form.getValues('media')?.map((file, index) => (
            <div key={index} className="flex items-center justify-between mt-2">
              <span className="text-sm truncate">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  const currentFiles = form.getValues('media');
                  form.setValue('media', currentFiles.filter((_, i) => i !== index));
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="button" onClick={handleNext}>
          Next: Category & Skills
        </Button>
      </div>
    </div>
  );
};

export default DetailsStep;
