
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ExperienceFormValues } from "@/types/educator";

export const useExperienceSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const submitExperience = async (data: ExperienceFormValues) => {
    setIsSubmitting(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("educator_experiences")
        .insert({
          educator_id: user.id,
          title: data.title,
          description: data.description,
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
          status: 'draft',
          start_date: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Experience created",
        description: "Your experience has been created successfully.",
      });
      
      navigate("/educator/experiences");
    } catch (error) {
      console.error("Error creating experience:", error);
      toast({
        title: "Error",
        description: "There was an error creating your experience. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitExperience, isSubmitting };
};
