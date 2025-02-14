
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

      // Create the experience first
      const { data: experience, error: experienceError } = await supabase
        .from("participant_experiences")
        .insert({
          title: data.title,
          description: data.description,
          status: status,
          educator_id: user.id,
          participant_id: user.id, // Required field as per schema
          start_date: new Date(data.start_date).toISOString(),
          end_date: data.end_date ? new Date(data.end_date).toISOString() : null,
        })
        .select()
        .single();

      if (experienceError) throw experienceError;

      // Now insert the milestones if any
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
