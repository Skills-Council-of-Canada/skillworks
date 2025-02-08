
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isEmployer: boolean;
}

export const MessageThread = () => {
  const { conversationId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  // Mock data - replace with actual messages data
  const messages: Message[] = [
    {
      id: "1",
      senderId: "applicant1",
      content: "Thank you for considering my application. I'm very interested in this opportunity.",
      timestamp: new Date("2024-02-25T10:00:00"),
      isEmployer: false,
    },
    {
      id: "2",
      senderId: "employer1",
      content: "Your experience looks promising. When would you be available for an interview?",
      timestamp: new Date("2024-02-25T10:15:00"),
      isEmployer: true,
    },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Handle sending message
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
    
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isEmployer ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.isEmployer
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t">
          <div className="flex w-full gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
