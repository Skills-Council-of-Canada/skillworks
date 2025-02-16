
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { MessageMutations } from "./types";
import type { Message } from "@/types/message";

export const useMessageMutations = (
  conversationId: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
): MessageMutations => {
  const { user } = useAuth();

  const handleReactionAdd = async (messageId: string, emoji: string) => {
    try {
      const message = await findMessage(messageId);
      if (!message) return;

      const existingReactions = message.reactions || [];
      const existingReaction = existingReactions.find((r) => r.emoji === emoji);
      
      let newReactions;
      if (existingReaction) {
        newReactions = existingReactions.map((r) =>
          r.emoji === emoji ? { ...r, count: r.count + 1 } : r
        );
      } else {
        newReactions = [...existingReactions, { emoji, count: 1 }];
      }

      const { error } = await supabase
        .from("messages")
        .update({ reactions: newReactions })
        .eq("id", messageId);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, reactions: newReactions } : m
        )
      );
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || !user) return;

    try {
      const { data: application } = await supabase
        .from("applications")
        .select("employer_id")
        .eq("id", conversationId)
        .single();

      if (!application) throw new Error("Application not found");

      const { error } = await supabase.from("messages").insert({
        content,
        application_id: conversationId,
        sender_id: user.id,
        recipient_id: application.employer_id,
        reactions: [],
        is_edited: false,
        is_pinned: false,
        attachments: [],
      });

      if (error) throw error;
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const pinMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ is_pinned: true })
        .eq("id", messageId);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, isPinned: true } : m
        )
      );
    } catch (error) {
      console.error("Error pinning message:", error);
      throw error;
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;

      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  };

  const editMessage = async (messageId: string, content: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ 
          content,
          is_edited: true,
          edited_at: new Date().toISOString()
        })
        .eq("id", messageId);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { 
            ...m, 
            content,
            isEdited: true,
            editedAt: new Date()
          } : m
        )
      );
    } catch (error) {
      console.error("Error editing message:", error);
      throw error;
    }
  };

  const findMessage = async (messageId: string) => {
    const message = (await supabase
      .from("messages")
      .select("*")
      .eq("id", messageId)
      .single()).data;

    return message;
  };

  return {
    handleReactionAdd,
    sendMessage,
    pinMessage,
    deleteMessage,
    editMessage,
  };
};
