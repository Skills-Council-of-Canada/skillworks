
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { MessageMutations } from "./types";
import type { Message, DatabaseMessage } from "@/types/message";
import type { Json } from "@/types/supabase";

export const useMessageMutations = (
  conversationId: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
): MessageMutations => {
  const { user } = useAuth();

  const handleReactionAdd = async (messageId: string, emoji: string) => {
    try {
      const { data: message } = await supabase
        .from("messages")
        .select("*")
        .eq("id", messageId)
        .single();

      if (!message) return;

      const existingReactions = (message.reactions as Array<{ emoji: string; count: number }>) || [];
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
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("id", messageId)
      .single();

    if (!data) return null;

    // Convert the raw data to DatabaseMessage type
    const message: DatabaseMessage = {
      id: data.id,
      application_id: data.application_id,
      sender_id: data.sender_id,
      recipient_id: data.recipient_id,
      content: data.content,
      created_at: data.created_at,
      read_at: data.read_at,
      reactions: data.reactions as any[] || [],
      thread_id: data.thread_id,
      is_pinned: data.is_pinned,
      is_edited: data.is_edited,
      edited_at: data.edited_at,
      deleted_at: data.deleted_at,
      edited_by: data.edited_by,
      forwarded_from: data.forwarded_from,
      attachments: Array.isArray(data.attachments) ? data.attachments : [],
      chat_id: data.chat_id,
      typing_state: data.typing_state,
      typing_updated_at: data.typing_updated_at,
      mentions: Array.isArray(data.mentions) 
        ? (data.mentions as any[]).map(m => ({
            id: m.id as string,
            name: m.name as string
          }))
        : [],
      search_vector: data.search_vector,
      reply_to: data.reply_to,
      status: (data.status as "sent" | "delivered" | "read") || "sent" // Ensure status is one of the allowed values
    };

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
