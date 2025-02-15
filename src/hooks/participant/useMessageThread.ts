
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Message, DatabaseMessage } from "@/types/message";

export const useMessageThread = (conversationId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("application_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (!data) return [];

      const dbMessages = data as DatabaseMessage[];

      return dbMessages.map((msg): Message => ({
        id: msg.id,
        applicationId: msg.application_id,
        senderId: msg.sender_id,
        senderType: msg.sender_id === user?.id ? "learner" : "employer",
        content: msg.content,
        timestamp: new Date(msg.created_at),
        readAt: msg.read_at ? new Date(msg.read_at) : undefined
      }));
    },
    enabled: !!conversationId && !!user?.id,
  });

  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: async (content: string) => {
      const { data: application, error: appError } = await supabase
        .from("applications")
        .select("employer_id")
        .eq("id", conversationId)
        .single();

      if (appError || !application) throw new Error("Application not found");

      const { error } = await supabase.from("messages").insert({
        content,
        sender_id: user?.id,
        recipient_id: application.employer_id,
        application_id: conversationId,
        type: "text",
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    },
  });

  return {
    messages: messages ?? [],
    sendMessage,
    isLoading,
  };
};
