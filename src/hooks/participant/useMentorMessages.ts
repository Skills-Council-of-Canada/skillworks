
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  isSender: boolean;
}

export const useMentorMessages = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["mentor-messages", user?.id],
    queryFn: async () => {
      const { data: relationship } = await supabase
        .from("mentor_relationships")
        .select("id")
        .eq("participant_id", user?.id)
        .single();

      if (!relationship) return [];

      const { data: messages, error } = await supabase
        .from("mentor_messages")
        .select("*")
        .eq("relationship_id", relationship.id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      return messages.map((msg) => ({
        ...msg,
        isSender: msg.sender_id === user?.id,
      })) as Message[];
    },
    enabled: !!user?.id,
  });

  const { mutateAsync: sendMessage } = useMutation({
    mutationFn: async (content: string) => {
      const { data: relationship } = await supabase
        .from("mentor_relationships")
        .select("id")
        .eq("participant_id", user?.id)
        .single();

      if (!relationship) throw new Error("No mentor relationship found");

      const { error } = await supabase.from("mentor_messages").insert({
        relationship_id: relationship.id,
        sender_id: user?.id,
        content,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentor-messages"] });
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
    messages,
    sendMessage,
    isLoading,
  };
};
