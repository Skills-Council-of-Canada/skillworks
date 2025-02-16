
import { useState, useEffect, useRef } from "react";
import { MessageCircle, SendHorizontal, Paperclip, SmilePlus, MoreVertical, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useMessageThread } from "@/hooks/participant/useMessageThread";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Message } from "@/types/message";

interface MessageThreadProps {
  conversationId: string;
}

export const MessageThread = ({ conversationId }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { messages, sendMessage, isLoading } = useMessageThread(conversationId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const { user } = useAuth();
  const [userTyping, setUserTyping] = useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const channel = supabase
      .channel('typing-channel')
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const typingUsers = Object.values(state).flat() as any[];
        const typingUser = typingUsers.find(u => u.isTyping && u.user !== user?.id);
        setUserTyping(typingUser ? typingUser.user : null);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ user: user?.id, isTyping: false });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, user?.id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      await sendMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleTyping = async () => {
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const channel = supabase.channel('typing-channel');
    await channel.track({ user: user?.id, isTyping: true });

    typingTimeoutRef.current = setTimeout(async () => {
      setIsTyping(false);
      await channel.track({ user: user?.id, isTyping: false });
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <div
      className={cn(
        "flex items-start gap-3 group",
        message.senderType === "learner" && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0" />
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div
          className={cn(
            "rounded-lg p-3 group-hover:shadow-sm transition-shadow",
            message.senderType === "learner"
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-muted rounded-tl-none"
          )}
        >
          <p className="text-sm break-words leading-relaxed">{message.content}</p>
          {message.isEdited && (
            <span className="text-xs opacity-70">(edited)</span>
          )}
        </div>
        <div className={cn(
          "flex gap-2 items-center text-xs text-muted-foreground",
          message.senderType === "learner" && "justify-end"
        )}>
          <span>{format(message.timestamp, "p")}</span>
          {message.readAt && message.senderType === "learner" && (
            <div className="flex gap-0.5">
              <Check className="h-3 w-3" />
              <Check className="h-3 w-3 -ml-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8" />
          <div>
            <h3 className="font-semibold text-lg">Project Chat</h3>
            {userTyping && (
              <p className="text-xs text-muted-foreground">Someone is typing...</p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <div className="flex gap-2 items-end">
          <div className="flex-1 flex gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Textarea
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyPress={handleKeyPress}
              placeholder="Write your message..."
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <SmilePlus className="h-4 w-4" />
            </Button>
            <Button 
              onClick={handleSendMessage} 
              size="icon"
              className="h-10 w-10 shrink-0"
              disabled={!newMessage.trim()}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
