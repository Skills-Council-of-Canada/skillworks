
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Message } from "@/types/message";
import type { MessageSubscription } from "./types";

export const useMessageSubscription = (
  conversationId: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
): MessageSubscription => {
  const { user } = useAuth();

  useEffect(() => {
    if (conversationId) {
      const channel = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "messages",
            filter: `application_id=eq.${conversationId}`,
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              const newMessage: Message = {
                id: payload.new.id,
                applicationId: payload.new.application_id,
                senderId: payload.new.sender_id,
                senderType: payload.new.sender_id === user?.id ? "participant" : "employer",
                content: payload.new.content,
                timestamp: new Date(payload.new.created_at),
                readAt: payload.new.read_at ? new Date(payload.new.read_at) : undefined,
                reactions: [],
                isEdited: false,
                isPinned: false,
                attachments: [],
              };
              setMessages((prev) => [...prev, newMessage]);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [conversationId, user?.id, setMessages]);

  return {
    unsubscribe: () => {
      // Cleanup is handled by the useEffect cleanup function
    },
  };
};
