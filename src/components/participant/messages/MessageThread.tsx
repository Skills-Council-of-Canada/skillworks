
import { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/hooks/useMessages";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

interface MessageThreadProps {
  conversationId: string;
}

export const MessageThread = ({ conversationId }: MessageThreadProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage, handleReactionAdd } = useMessages(conversationId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
            <MessageBubble
              key={message.id}
              message={message}
              onReactionAdd={handleReactionAdd}
            />
          ))}
        </div>
      </ScrollArea>
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};
