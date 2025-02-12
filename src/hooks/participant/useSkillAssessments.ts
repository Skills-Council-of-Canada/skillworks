
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface SkillAssessment {
  id: string;
  skill_name: string;
  current_level: number;
  target_level: number;
  notes?: string;
  next_assessment_date: string;
  created_at: string;
}

export const useSkillAssessments = () => {
  const { user } = useAuth();

  const { data: assessments, isLoading } = useQuery({
    queryKey: ["skill-assessments", user?.id],
    queryFn: async () => {
      const { data: relationship } = await supabase
        .from("mentor_relationships")
        .select("id")
        .eq("participant_id", user?.id)
        .single();

      if (!relationship) return [];

      const { data, error } = await supabase
        .from("mentor_skill_assessments")
        .select("*")
        .eq("relationship_id", relationship.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as SkillAssessment[];
    },
    enabled: !!user?.id,
  });

  return {
    assessments,
    isLoading,
  };
};
