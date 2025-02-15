import { Button } from "@/components/ui/button";
import { Save, Upload, Globe } from "lucide-react";
import { ExperienceFormValues as EducatorExperienceFormValues } from "@/types/educator";
import { ExperienceFormValues as SubmissionExperienceFormValues } from "@/hooks/useExperienceSubmission";
import { useExperienceSubmission } from "@/hooks/useExperienceSubmission";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ActionButtonsProps {
  values: EducatorExperienceFormValues;
  isComplete: boolean;
}

const ActionButtons = ({ values, isComplete }: ActionButtonsProps) => {
  const { submitExperience, isSubmitting } = useExperienceSubmission();
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [visibility, setVisibility] = useState<'private' | 'public' | 'invite_only'>('private');
  const { toast } = useToast();

  const convertToSubmissionValues = (values: EducatorExperienceFormValues): SubmissionExperienceFormValues => {
    // Map the program type to the correct value
    let programType: 'bootcamp' | 'certificate' | 'graduate' | 'workforce_development' = 'certificate';
    switch (values.program_type) {
      case 'diploma':
        programType = 'workforce_development';
        break;
      case 'certificate':
        programType = 'certificate';
        break;
      case 'bachelors':
        programType = 'graduate';
        break;
    }

    return {
      title: values.title,
      learner_capabilities: values.learner_capabilities,
      expected_outcomes: values.expected_outcomes,
      project_examples: values.project_examples,
      start_date: values.start_date,
      end_date: values.end_date,
      trade_category: values.trade_category,
      subcategories: values.subcategories,
      skill_tags: values.skill_tags,
      media_urls: [],  // Convert File[] to string[] URLs after upload
      video_url: undefined,
      team_structure: values.team_structure,
      team_size: values.team_size,
      preferred_companies: undefined,
      duration_hours: values.duration_weeks * 40, // Convert weeks to hours
      learner_level: values.skill_level,
      max_learners: values.class_size,
      program_type: programType,
      class_size: values.class_size,
      class_affiliation: false,
      work_structure: values.team_structure,
      assignment_method: values.matching_type === 'self' ? 'self' : 'admin',
      screening_questions: values.screening_questions?.map(q => ({
        ...q,
        question_type: 'text' as const
      })),
      milestones: values.milestones,
      location_preference: 'anywhere',
      industry_preferences: values.preferred_industries || [],
      company_types: values.company_types || [],
      compensation_type: values.compensation_type as 'unpaid' | 'hourly' | 'flat' || 'unpaid'
    };
  };

  const handleSaveDraft = async () => {
    const submissionValues = convertToSubmissionValues(values);
    await submitExperience(submissionValues, 'draft');
  };

  const handlePublish = async () => {
    if (!isComplete) return;
    const submissionValues = convertToSubmissionValues(values);
    await submitExperience(submissionValues, 'pending_approval');
    setIsPublishDialogOpen(false);
  };

  return (
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

      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogTrigger asChild>
          <Button
            disabled={!isComplete || isSubmitting}
            className="bg-primary hover:bg-primary/90 flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Publish Experience
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Experience</DialogTitle>
            <DialogDescription>
              Choose how your experience will be visible in the marketplace.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Visibility Settings</Label>
              <Select
                value={visibility}
                onValueChange={(value: 'private' | 'public' | 'invite_only') => setVisibility(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Private - Only visible to you
                    </div>
                  </SelectItem>
                  <SelectItem value="public">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Public - Visible to all users
                    </div>
                  </SelectItem>
                  <SelectItem value="invite_only">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Invite Only - Only visible to invited users
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish} disabled={isSubmitting}>
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
