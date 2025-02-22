
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { useMentorMessages } from "@/hooks/participant/useMentorMessages";
import { useIsMobile } from "@/hooks/use-mobile";

export const MentorMessaging = () => {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isLoading } = useMentorMessages();
  const isMobile = useIsMobile();

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="h-[calc(100vh-400px)] min-h-[300px] overflow-y-auto space-y-3 sm:space-y-4 bg-gray-50 rounded-md p-3 sm:p-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 sm:p-3 animate-fade-in ${
                msg.isSender
                  ? "bg-primary text-primary-foreground"
                  : "bg-white shadow-sm"
              }`}
            >
              <p className="text-sm sm:text-base break-words">{msg.content}</p>
              <span className="text-[10px] sm:text-xs opacity-70 mt-1 block">
                {new Date(msg.created_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 min-h-[60px] text-sm sm:text-base"
          rows={isMobile ? 2 : 3}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading || !message.trim()}
          className="w-full sm:w-auto"
          size={isMobile ? "sm" : "default"}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
};
