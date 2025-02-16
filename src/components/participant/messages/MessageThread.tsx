
import { useState } from "react";
import { MessageCircle, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useMessageThread } from "@/hooks/participant/useMessageThread";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar } from "@/components/ui/avatar";

interface MessageThreadProps {
  conversationId: string;
}

export const MessageThread = ({ conversationId }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");
  const { messages, sendMessage, isLoading } = useMessageThread(conversationId);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      await sendMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="px-4 py-3 border-b">
        <h3 className="font-semibold text-lg">Conversation</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3",
                message.senderType === "learner" && "flex-row-reverse"
              )}
            >
              <Avatar className="h-8 w-8 shrink-0" />
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.senderType === "learner"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted rounded-tl-none"
                )}
              >
                <p className="text-sm break-words leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {format(message.timestamp, "p")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <div className="flex gap-2 items-end">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write your message..."
            className="min-h-[80px] resize-none"
          />
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
  );
};
