
import { UseFormReturn } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface ScreeningQuestionsSectionProps {
  form: UseFormReturn<ExperienceFormValues>;
}

const ScreeningQuestionsSection = ({ form }: ScreeningQuestionsSectionProps) => {
  const { register, watch, setValue } = form;
  const watchScreeningQuestions = watch("screening_questions") || [];

  const addScreeningQuestion = () => {
    const currentQuestions = form.getValues("screening_questions") || [];
    setValue("screening_questions", [...currentQuestions, { question: "", required: false }]);
  };

  const removeScreeningQuestion = (index: number) => {
    const currentQuestions = form.getValues("screening_questions") || [];
    setValue("screening_questions", currentQuestions.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Label>Screening Questions</Label>
        <Button type="button" variant="outline" size="sm" onClick={addScreeningQuestion}>
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>
      <div className="space-y-4">
        {watchScreeningQuestions.map((_, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Enter your question"
                  {...register(`screening_questions.${index}.question`)}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register(`screening_questions.${index}.required`)}
                    id={`required-${index}`}
                  />
                  <Label htmlFor={`required-${index}`}>Required</Label>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeScreeningQuestion(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScreeningQuestionsSection;
