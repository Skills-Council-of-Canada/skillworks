
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ExperienceFormValues } from "@/types/educator";

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

      // First, check if the user is a verified educator
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      if (profile.role !== 'educator') throw new Error("Only educators can create experiences");

      const { error } = await supabase
        .from("educator_experiences")
        .insert({
          title: data.title,
          description: data.description,
          expected_outcomes: data.expected_outcomes || [],
          example_projects: data.example_projects || [],
          trade_category: data.trade_category,
          subcategories: data.subcategories || [],
          skill_tags: data.skill_tags || [],
          class_size: data.class_size,
          team_size: data.team_size,
          skill_level: data.skill_level,
          duration_weeks: data.duration_weeks,
          required_certifications: data.required_certifications || [],
          preferred_industries: data.preferred_industries || [],
          company_types: data.company_types || [],
          compensation_type: data.compensation_type,
          screening_questions: data.screening_questions || [],
          status: status,
          start_date: data.start_date,
          end_date: data.end_date,
          milestones: data.milestones.map(m => ({
            title: m.title,
            description: m.description || '',
            due_date: m.due_date
          }))
        });

      if (error) throw error;

      toast({
        title: status === 'draft' ? "Draft saved" : "Experience submitted for approval",
        description: status === 'draft' 
          ? "Your experience has been saved as a draft."
          : "Your experience has been submitted for approval.",
      });
      
      navigate("/educator/experiences");
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
