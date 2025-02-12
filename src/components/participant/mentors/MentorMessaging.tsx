
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { useMentorMessages } from "@/hooks/participant/useMentorMessages";

export const MentorMessaging = () => {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isLoading } = useMentorMessages();

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="space-y-4">
      <div className="h-[400px] overflow-y-auto space-y-4 p-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.isSender
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs opacity-70">
                {new Date(msg.created_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading || !message.trim()}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
};
