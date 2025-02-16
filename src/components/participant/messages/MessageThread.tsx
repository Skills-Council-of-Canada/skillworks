
import { useState, useEffect, useRef } from "react";
import { MessageSquare, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { MessageReactions } from "./MessageReactions";
import type { Message } from "@/types/message";

interface MessageThreadProps {
  conversationId: string;
}

export const MessageThread = ({ conversationId }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      subscribeToMessages();
      subscribeToTyping();
    }
  }, [conversationId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  const handleReactionAdd = async (messageId: string, emoji: string) => {
    try {
      const message = messages.find((m) => m.id === messageId);
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

  const subscribeToMessages = () => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all changes
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
              senderType: payload.new.sender_id === user?.id ? "learner" : "employer",
              content: payload.new.content,
              timestamp: new Date(payload.new.created_at),
              readAt: payload.new.read_at ? new Date(payload.new.read_at) : undefined,
              reactions: Array.isArray(payload.new.reactions) ? payload.new.reactions.map(r => ({
                emoji: (r as any).emoji,
                count: (r as any).count
              })) : [],
              isEdited: payload.new.is_edited || false,
              editedAt: payload.new.edited_at ? new Date(payload.new.edited_at) : undefined,
              threadId: payload.new.thread_id || undefined,
              isPinned: payload.new.is_pinned || false,
              attachments: Array.isArray(payload.new.attachments) ? payload.new.attachments.map(a => ({
                name: (a as any).name,
                url: (a as any).url,
                type: (a as any).type
              })) : [],
            };
            setMessages((prev) => [...prev, newMessage]);
          } else if (payload.eventType === "UPDATE") {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === payload.new.id
                  ? {
                      ...msg,
                      reactions: Array.isArray(payload.new.reactions) ? payload.new.reactions.map(r => ({
                        emoji: (r as any).emoji,
                        count: (r as any).count
                      })) : [],
                    }
                  : msg
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const subscribeToTyping = () => {
    // TODO: Implement typing indicator subscription
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      const { data: application } = await supabase
        .from("applications")
        .select("employer_id")
        .eq("id", conversationId)
        .single();

      if (!application) throw new Error("Application not found");

      const { error } = await supabase.from("messages").insert({
        content: newMessage,
        application_id: conversationId,
        sender_id: user.id,
        recipient_id: application.employer_id,
        reactions: [],
        is_edited: false,
        is_pinned: false,
        attachments: [],
      });

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-background/50">
        <MessageSquare className="h-8 w-8 text-muted-foreground/50 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <ScrollArea ref={scrollRef} className="flex-1 px-4 py-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "message-bubble flex items-start gap-3 group",
                message.senderType === "learner" && "flex-row-reverse"
              )}
            >
              <Avatar className="h-8 w-8 shrink-0 border-2 border-background subtle-shadow" />
              <div className="flex flex-col gap-1 max-w-[80%]">
                <div
                  className={cn(
                    "rounded-lg p-3 subtle-shadow",
                    message.senderType === "learner"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-accent/10 rounded-tl-none"
                  )}
                >
                  <p className="text-sm break-words leading-relaxed">
                    {message.content}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground/70">
                    {format(message.timestamp, "p")}
                  </span>
                  <MessageReactions
                    messageId={message.id}
                    reactions={message.reactions || []}
                    onReactionAdd={(emoji) => handleReactionAdd(message.id, emoji)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t glass-effect">
        <div className="flex gap-2 items-end">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write your message..."
            className="min-h-[80px] resize-none bg-background/80 focus:bg-background transition-colors duration-200"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="h-10 w-10 shrink-0 subtle-shadow"
            disabled={!newMessage.trim()}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

