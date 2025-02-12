
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface FeedbackRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

interface CreateFeedbackRequestParams {
  title: string;
  description: string;
}

export const useFeedbackRequests = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["feedback-requests", user?.id],
    queryFn: async () => {
      const { data: relationship } = await supabase
        .from("mentor_relationships")
        .select("id")
        .eq("participant_id", user?.id)
        .single();

      if (!relationship) return [];

      const { data, error } = await supabase
        .from("mentor_feedback_requests")
        .select("*")
        .eq("relationship_id", relationship.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as FeedbackRequest[];
    },
    enabled: !!user?.id,
  });

  const { mutateAsync: createRequest } = useMutation({
    mutationFn: async ({ title, description }: CreateFeedbackRequestParams) => {
      const { data: relationship } = await supabase
        .from("mentor_relationships")
        .select("id")
        .eq("participant_id", user?.id)
        .single();

      if (!relationship) throw new Error("No mentor relationship found");

      const { error } = await supabase
        .from("mentor_feedback_requests")
        .insert({
          relationship_id: relationship.id,
          participant_id: user?.id,
          title,
          description,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback-requests"] });
      toast({
        title: "Success",
        description: "Feedback request submitted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit feedback request",
        variant: "destructive",
      });
    },
  });

  return {
    requests,
    createRequest,
    isLoading,
  };
};
