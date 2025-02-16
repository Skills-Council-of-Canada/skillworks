
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Message } from "@/types/message";
import { useAuth } from "@/contexts/AuthContext";
import { useMessageMutations } from "./useMessageMutations";
import { useMessageSubscription } from "./useMessageSubscription";
import type { UseMessagesReturn } from "./types";

export const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const mutations = useMessageMutations(conversationId, setMessages);
  const subscription = useMessageSubscription(conversationId, setMessages);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("application_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setMessages(
        data.map((msg): Message => ({
          id: msg.id,
          applicationId: msg.application_id,
          senderId: msg.sender_id,
          senderType: msg.sender_id === user?.id ? "learner" : "employer",
          content: msg.content,
          timestamp: new Date(msg.created_at),
          readAt: msg.read_at ? new Date(msg.read_at) : undefined,
          reactions: Array.isArray(msg.reactions) ? msg.reactions.map(r => {
            const reaction = r as { emoji: string; count: number };
            return {
              emoji: reaction.emoji,
              count: reaction.count
            };
          }) : [],
          isEdited: msg.is_edited || false,
          editedAt: msg.edited_at ? new Date(msg.edited_at) : undefined,
          threadId: msg.thread_id || undefined,
          isPinned: msg.is_pinned || false,
          attachments: Array.isArray(msg.attachments) ? msg.attachments.map(a => {
            const attachment = a as { name: string; url: string; type: string };
            return {
              name: attachment.name,
              url: attachment.url,
              type: attachment.type
            };
          }) : [],
        }))
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId, user?.id]);

  return {
    messages,
    isLoading,
    ...mutations
  };
};
