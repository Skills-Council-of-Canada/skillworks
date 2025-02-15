
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useMessageThread } from "@/hooks/participant/useMessageThread";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.senderType === "learner"
                  ? "justify-end"
                  : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.senderType === "learner"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm break-words">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {format(message.timestamp, "p")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="min-h-[80px] resize-none"
          />
          <Button 
            onClick={handleSendMessage} 
            className="shrink-0"
            disabled={!newMessage.trim()}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
