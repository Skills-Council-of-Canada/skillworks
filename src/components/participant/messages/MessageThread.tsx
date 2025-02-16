
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
import type { Message } from "@/types/message";

interface MessageThreadProps {
  conversationId: string;
}

export const MessageThread = ({ conversationId }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      subscribeToMessages();
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
        }))
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `application_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMessage: Message = {
            id: payload.new.id,
            applicationId: payload.new.application_id,
            senderId: payload.new.sender_id,
            senderType: payload.new.sender_id === user?.id ? "learner" : "employer",
            content: payload.new.content,
            timestamp: new Date(payload.new.created_at),
            readAt: payload.new.read_at ? new Date(payload.new.read_at) : undefined,
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
                <span className="text-xs text-muted-foreground/70">
                  {format(message.timestamp, "p")}
                </span>
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
