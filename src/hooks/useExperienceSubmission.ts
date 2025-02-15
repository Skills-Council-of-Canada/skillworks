
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface ExperienceFormValues {
  // Required fields
  title: string;
  learner_capabilities: string;
  expected_outcomes: string[];
  project_examples: string[];
  start_date: string;
  
  // Optional fields
  end_date?: string;
  trade_category?: string;
  subcategories?: string[];
  skill_tags?: string[];
  media_urls?: string[];
  video_url?: string;
  team_structure?: string;
  team_size?: number;
  preferred_companies?: any;
  duration_hours?: number;
  learner_level?: string;
  max_learners?: number;
  
  // New fields
  program_type?: 'bootcamp' | 'certificate' | 'graduate' | 'workforce_development';
  class_size?: number;
  class_affiliation?: boolean;
  course_name?: string;
  work_structure?: 'individual' | 'team';
  assignment_method?: 'admin' | 'self' | 'application';
  hours_per_learner?: number;
  match_request_close_date?: string;
  date_assignment_rule?: 'same' | 'company' | 'team';
  submission_instructions?: string;
  projects_wanted?: number;
  difficulty_level?: string[];
  location_preference?: 'anywhere' | 'national' | 'regional' | 'local';
  industry_preferences?: string[];
  company_types?: string[];
  compensation_type?: 'unpaid' | 'hourly' | 'flat';
  screening_questions?: Array<{
    question: string;
    required: boolean;
    question_type: 'text' | 'multiple_choice' | 'yes_no';
    options?: string[];
  }>;
  milestones?: Array<{
    title: string;
    description?: string;
    due_date: string;
  }>;
}

type ExperienceSubmissionStatus = 'draft' | 'pending_approval';

export const useExperienceSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const submitExperience = async (data: ExperienceFormValues, status: ExperienceSubmissionStatus = 'draft') => {
    setIsSubmitting(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) throw new Error("User not authenticated");

      // Create the experience
      const { data: experience, error: experienceError } = await supabase
        .from("participant_experiences")
        .insert({
          participant_id: user.id,
          title: data.title,
          learner_capabilities: data.learner_capabilities,
          expected_outcomes: data.expected_outcomes,
          project_examples: data.project_examples,
          status: status,
          start_date: new Date(data.start_date).toISOString(),
          end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
          trade_category: data.trade_category || null,
          subcategories: data.subcategories || [],
          skill_tags: data.skill_tags || [],
          media_urls: data.media_urls || [],
          video_url: data.video_url || null,
          team_structure: data.team_structure || 'individual',
          team_size: data.team_size || 1,
          preferred_companies: data.preferred_companies || null,
          duration_hours: data.duration_hours || 40,
          learner_level: data.learner_level || 'beginner',
          max_learners: data.max_learners || 1,
          program_type: data.program_type || null,
          class_size: data.class_size || 1,
          class_affiliation: data.class_affiliation || false,
          course_name: data.course_name || null,
          work_structure: data.work_structure || null,
          assignment_method: data.assignment_method || null,
          hours_per_learner: data.hours_per_learner || null,
          match_request_close_date: data.match_request_close_date ? new Date(data.match_request_close_date).toISOString() : null,
          date_assignment_rule: data.date_assignment_rule || null,
          submission_instructions: data.submission_instructions || null,
          projects_wanted: data.projects_wanted || null,
          difficulty_level: data.difficulty_level || [],
          location_preference: data.location_preference || null,
          industry_preferences: data.industry_preferences || [],
          company_types: data.company_types || [],
          compensation_type: data.compensation_type || null
        })
        .select()
        .single();

      if (experienceError) throw experienceError;

      // Insert milestones if any
      if (data.milestones?.length > 0) {
        const { error: milestonesError } = await supabase
          .from("experience_milestones")
          .insert(
            data.milestones.map(milestone => ({
              participant_experience_id: experience.id,
              title: milestone.title,
              description: milestone.description || '',
              due_date: new Date(milestone.due_date).toISOString(),
              status: 'pending'
            }))
          );

        if (milestonesError) throw milestonesError;
      }

      // Insert screening questions if any
      if (data.screening_questions?.length > 0) {
        const { error: questionsError } = await supabase
          .from("experience_screening_questions")
          .insert(
            data.screening_questions.map(question => ({
              experience_id: experience.id,
              question: question.question,
              required: question.required,
              question_type: question.question_type,
              options: question.options || []
            }))
          );

        if (questionsError) throw questionsError;
      }

      toast({
        title: status === 'draft' ? "Draft saved" : "Experience submitted for approval",
        description: status === 'draft' 
          ? "Your experience has been saved as a draft."
          : "Your experience has been submitted for approval.",
      });
      
      navigate("/participant/experiences");
    } catch (error: any) {
      console.error("Error creating experience:", error);
      toast({
        title: "Error",
        description: error.message || "There was an error creating your experience. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitExperience, isSubmitting };
};
