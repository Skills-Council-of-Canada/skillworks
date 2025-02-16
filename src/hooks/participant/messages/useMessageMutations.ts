
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useMessageMutations = (conversationId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleReactionAdd = async (messageId: string, emoji: string) => {
    if (!messageId) return;

    const { error } = await supabase.rpc('handle_message_reaction', {
      message_id: messageId,
      emoji: emoji
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add reaction",
        variant: "destructive",
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
  };

  const pinMessage = async (messageId: string) => {
    const { error } = await supabase
      .from("messages")
      .update({ is_pinned: true })
      .eq("id", messageId);

    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
  };

  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase
      .from("messages")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", messageId);

    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
  };

  const editMessage = async (messageId: string, content: string) => {
    const { error } = await supabase
      .from("messages")
      .update({
        content,
        is_edited: true,
        edited_at: new Date().toISOString(),
      })
      .eq("id", messageId);

    if (error) throw error;
    queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
  };

  return {
    handleReactionAdd,
    pinMessage,
    deleteMessage,
    editMessage,
  };
};
