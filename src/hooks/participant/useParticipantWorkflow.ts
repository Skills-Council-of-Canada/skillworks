
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ParticipantWorkflowStatus } from "@/types/participant";
import { useAuth } from "@/contexts/AuthContext";

export const useParticipantWorkflow = () => {
  const { user } = useAuth();

  const { data: workflowStatus, isLoading } = useQuery({
    queryKey: ["participant-workflow", user?.id],
    queryFn: async () => {
      const { data: workflow, error } = await supabase
        .from("participant_workflow_status")
        .select("*")
        .eq("participant_id", user?.id)
        .maybeSingle();

      if (error) throw error;
      return workflow as ParticipantWorkflowStatus;
    },
    enabled: !!user?.id,
  });

  return {
    workflowStatus,
    isLoading,
  };
};
