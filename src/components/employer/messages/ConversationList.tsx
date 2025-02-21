
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  applicantId: string;
  applicantName: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  projectTitle: string;
}

export const ConversationList = () => {
  const navigate = useNavigate();
  // Mock data - replace with actual conversations data
  const conversations: Conversation[] = [
    {
      id: "1",
      applicantId: "a1",
      applicantName: "John Doe",
      lastMessage: "Thank you for considering my application",
      timestamp: new Date("2024-02-25T10:00:00"),
      unread: true,
      projectTitle: "Electrical Maintenance Training",
    },
    {
      id: "2",
      applicantId: "a2",
      applicantName: "Jane Smith",
      lastMessage: "When would be a good time to discuss the position?",
      timestamp: new Date("2024-02-24T15:30:00"),
      unread: false,
      projectTitle: "HVAC Installation Project",
    },
  ];

  const handleSelectConversation = (conversationId: string) => {
    navigate(`/employer/messages/${conversationId}`);
  };

  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <Card
          key={conversation.id}
          className={cn(
            "cursor-pointer hover:bg-accent transition-colors",
            conversation.unread && "border-primary"
          )}
          onClick={() => handleSelectConversation(conversation.id)}
        >
          <CardContent className="flex items-start gap-4 p-4">
            <MessageCircle className="h-8 w-8 text-foreground mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{conversation.applicantName}</h3>
                <span className="text-sm text-foreground/70">
                  {conversation.timestamp.toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-foreground/80">
                Re: {conversation.projectTitle}
              </p>
              <p className="text-sm mt-1 text-foreground/90">{conversation.lastMessage}</p>
              {conversation.unread && (
                <Badge variant="default" className="mt-2">
                  New
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
