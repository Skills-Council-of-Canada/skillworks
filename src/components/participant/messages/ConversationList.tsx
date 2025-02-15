
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Conversation } from "@/types/message";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const ConversationList = ({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) => {
  if (!conversations.length) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No conversations yet
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-14rem)]">
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <Button
            key={conversation.applicationId}
            variant="ghost"
            className={cn(
              "w-full justify-start px-4",
              selectedId === conversation.applicationId && "bg-accent"
            )}
            onClick={() => onSelect(conversation.applicationId)}
          >
            <div className="flex items-start gap-3 w-full">
              <MessageSquare className="h-5 w-5 mt-1 shrink-0" />
              <div className="flex-1 text-left space-y-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium line-clamp-1">
                    {conversation.projectId}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(conversation.updatedAt), "MMM d")}
                  </span>
                </div>
                {conversation.lastMessage && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {conversation.lastMessage.content}
                  </p>
                )}
                {conversation.unreadCount > 0 && (
                  <Badge variant="default" className="mt-1">
                    {conversation.unreadCount} new
                  </Badge>
                )}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};
