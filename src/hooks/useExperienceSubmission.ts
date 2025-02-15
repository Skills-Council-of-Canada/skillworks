
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface ExperienceFormValues {
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  trade_category?: string;
  subcategories?: string[];
  skill_tags?: string[];
  expected_outcomes?: string[];
  project_examples?: any[];
  learner_capabilities?: string;
  media_urls?: string[];
  video_url?: string;
  team_structure?: string;
  team_size?: number;
  preferred_companies?: any;
  duration_hours?: number;
  learner_level?: string;
  max_learners?: number;
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
          description: data.description,
          status: status,
          start_date: new Date(data.start_date).toISOString(),
          end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
          trade_category: data.trade_category,
          subcategories: data.subcategories,
          skill_tags: data.skill_tags,
          expected_outcomes: data.expected_outcomes,
          project_examples: data.project_examples,
          learner_capabilities: data.learner_capabilities,
          media_urls: data.media_urls,
          video_url: data.video_url,
          team_structure: data.team_structure,
          team_size: data.team_size,
          preferred_companies: data.preferred_companies,
          duration_hours: data.duration_hours,
          learner_level: data.learner_level,
          max_learners: data.max_learners
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
