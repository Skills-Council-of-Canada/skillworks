
import { useNavigate } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExperienceFormValues } from "@/types/educator";
import { AlertCircle, Edit, Save, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useExperienceSubmission } from "@/hooks/useExperienceSubmission";

interface Props {
  form: UseFormReturn<ExperienceFormValues>;
  onEdit: (step: string) => void;
}

const ReviewStep = ({ form, onEdit }: Props) => {
  const navigate = useNavigate();
  const values = form.getValues();
  const { submitExperience, isSubmitting } = useExperienceSubmission();

  const isComplete = Boolean(
    values.title &&
    values.description &&
    values.trade_category &&
    values.skill_level &&
    values.start_date &&
    values.end_date &&
    values.milestones.length > 0 &&
    values.class_size &&
    values.team_size
  );

  const handlePublish = async () => {
    if (!isComplete) return;
    await submitExperience(values, 'pending_approval');
  };

  const handleSaveDraft = async () => {
    await submitExperience(values, 'draft');
  };

  return (
    <div className="space-y-6">
      {!isComplete && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please complete all mandatory fields before publishing.
          </AlertDescription>
        </Alert>
      )}

      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-6">
          {/* Basic Details Section */}
          <ReviewSection
            title="Experience Details"
            onEdit={() => onEdit("details")}
          >
            <div className="space-y-2">
              <p><strong>Title:</strong> {values.title}</p>
              <p><strong>Description:</strong> {values.description}</p>
              {values.expected_outcomes?.length > 0 && (
                <div>
                  <strong>Expected Outcomes:</strong>
                  <ul className="list-disc list-inside">
                    {values.expected_outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ReviewSection>

          {/* Category & Skills Section */}
          <ReviewSection
            title="Category & Skills"
            onEdit={() => onEdit("category")}
          >
            <div className="space-y-2">
              <p><strong>Trade Category:</strong> {values.trade_category}</p>
              <p><strong>Skill Level:</strong> {values.skill_level}</p>
              {values.skill_tags?.length > 0 && (
                <div>
                  <strong>Skills:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {values.skill_tags.map((tag, index) => (
                      <span key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ReviewSection>

          {/* Learner Details Section */}
          <ReviewSection
            title="Learner Details"
            onEdit={() => onEdit("learners")}
          >
            <div className="space-y-2">
              <p><strong>Class Size:</strong> {values.class_size}</p>
              <p><strong>Team Size:</strong> {values.team_size}</p>
              <p><strong>Program Type:</strong> {values.program_type}</p>
              <p><strong>Team Structure:</strong> {values.team_structure}</p>
              <p><strong>Matching Type:</strong> {values.matching_type}</p>
            </div>
          </ReviewSection>

          {/* Timeline Section */}
          <ReviewSection
            title="Timeline"
            onEdit={() => onEdit("timeline")}
          >
            <div className="space-y-2">
              <p><strong>Start Date:</strong> {new Date(values.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(values.end_date).toLocaleDateString()}</p>
              {values.milestones?.length > 0 && (
                <div>
                  <strong>Milestones:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {values.milestones.map((milestone, index) => (
                      <li key={index}>
                        {milestone.title} - Due: {new Date(milestone.due_date).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ReviewSection>

          {/* Company Preferences Section */}
          <ReviewSection
            title="Company Preferences"
            onEdit={() => onEdit("employer")}
          >
            <div className="space-y-2">
              {values.preferred_industries?.length > 0 && (
                <div>
                  <strong>Preferred Industries:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {values.preferred_industries.map((industry, index) => (
                      <span key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {values.company_types?.length > 0 && (
                <div className="mt-2">
                  <strong>Company Types:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {values.company_types.map((type, index) => (
                      <span key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {values.compensation_type && (
                <p><strong>Compensation Type:</strong> {values.compensation_type}</p>
              )}
              {values.screening_questions?.length > 0 && (
                <div className="mt-2">
                  <strong>Screening Questions:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {values.screening_questions.map((q, index) => (
                      <li key={index}>
                        {q.question} {q.required && "(Required)"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ReviewSection>
        </div>
      </ScrollArea>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          disabled={isSubmitting}
          className="flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save as Draft
        </Button>
        <Button
          onClick={handlePublish}
          disabled={!isComplete || isSubmitting}
          className="bg-primary hover:bg-primary/90 flex items-center"
        >
          <Upload className="w-4 h-4 mr-2" />
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}

const ReviewSection = ({ title, children, onEdit }: ReviewSectionProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="flex items-center text-muted-foreground hover:text-primary"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
      <Separator className="mb-4" />
      {children}
    </Card>
  );
};

export default ReviewStep;
