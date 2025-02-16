import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Message, DatabaseMessage } from "@/types/message";

export const useMessageThread = (conversationId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data: application } = await supabase
        .from("applications")
        .select("employer_id")
        .eq("id", conversationId)
        .single();

      if (!application) {
        throw new Error("Application not found");
      }

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("application_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (!data) return [];

      return data.map((msg): Message => ({
        id: msg.id,
        applicationId: msg.application_id,
        senderId: msg.sender_id,
        senderType: msg.sender_id === user?.id ? "learner" : "employer",
        content: msg.content,
        timestamp: new Date(msg.created_at),
        readAt: msg.read_at ? new Date(msg.read_at) : undefined,
        reactions: Array.isArray(msg.reactions) 
          ? msg.reactions.map(r => {
              const reaction = r as { emoji: string; count: number };
              return {
                emoji: reaction.emoji,
                count: reaction.count
              };
            })
          : [],
        isEdited: msg.is_edited || false,
        editedAt: msg.edited_at ? new Date(msg.edited_at) : undefined,
        isPinned: msg.is_pinned || false,
        threadId: msg.thread_id,
        mentions: Array.isArray(msg.mentions) 
          ? msg.mentions.map(m => ({
              id: m.id,
              name: m.name
            }))
          : [],
        chatType: 'direct',
        chatId: msg.chat_id
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

      // Extract mentions from content
      const mentionRegex = /@\[([^\]]+)\]\(([^)]+)\)/g;
      const mentions: { id: string; name: string }[] = [];
      let match;
      
      while ((match = mentionRegex.exec(content)) !== null) {
        mentions.push({ name: match[1], id: match[2] });
      }

      const { error } = await supabase.from("messages").insert({
        content,
        sender_id: user?.id,
        recipient_id: application.employer_id,
        application_id: conversationId,
        mentions,
        status: 'sent'
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

  const handleReactionAdd = async (messageId: string, emoji: string) => {
    if (!user?.id) return;

    const { error } = await supabase.rpc('handle_message_reaction', {
      message_id: messageId,
      user_id: user.id,
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
    messages: messages ?? [],
    sendMessage,
    isLoading,
    handleReactionAdd,
    pinMessage,
    deleteMessage,
    editMessage,
  };
};
