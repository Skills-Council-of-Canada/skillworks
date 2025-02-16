
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Message } from "@/types/message";
import { useMessageMutations } from "./messages/useMessageMutations";
import { useChatInfo } from "./messages/useChatInfo";
import type { UseMessageThreadReturn } from "./messages/types";

export const useMessageThread = (conversationId: string): UseMessageThreadReturn => {
  const { user } = useAuth();
  
  const { data: chatInfo } = useChatInfo(conversationId);
  const { handleReactionAdd, pinMessage, deleteMessage, editMessage } = useMessageMutations(conversationId);

  const { data: messages = [], isLoading } = useQuery({
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
        senderType: msg.sender_id === user?.id ? "participant" : "employer",
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
          ? msg.mentions.map(m => {
              const mention = m as { id: string; name: string };
              return {
                id: mention.id,
                name: mention.name
              };
            })
          : [],
        chatType: 'direct',
        chatId: msg.chat_id
      }));
    },
    enabled: !!conversationId && !!user?.id,
  });

  const sendMessage = async (content: string) => {
    if (!content.trim() || !user?.id) return;

    const { data: application, error: appError } = await supabase
      .from("applications")
      .select("employer_id")
      .eq("id", conversationId)
      .single();

    if (appError || !application) throw new Error("Application not found");

    const mentionRegex = /@\[([^\]]+)\]\(([^)]+)\)/g;
    const mentions: { id: string; name: string }[] = [];
    let match;
    
    while ((match = mentionRegex.exec(content)) !== null) {
      mentions.push({ name: match[1], id: match[2] });
    }

    const { error } = await supabase.from("messages").insert({
      content,
      sender_id: user.id,
      recipient_id: application.employer_id,
      application_id: conversationId,
      mentions,
      status: 'sent'
    });

    if (error) throw error;
  };

  const searchMessages = async (query: string) => {
    if (!query.trim()) return;

    const { data, error } = await supabase.rpc('search_messages', {
      search_query: query,
      chat_id: conversationId
    });

    if (error) {
      throw error;
    }

    return data;
  };

  return {
    messages,
    isLoading,
    sendMessage,
    handleReactionAdd,
    pinMessage,
    deleteMessage,
    editMessage,
    searchMessages,
    chatInfo
  };
};
