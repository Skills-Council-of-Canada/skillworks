
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import type { Conversation } from "@/types/message";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-2">
        {conversations.map((conversation) => (
          <Button
            key={conversation.applicationId}
            variant="ghost"
            className={cn(
              "w-full flex flex-col items-start p-4 h-auto gap-1 hover:bg-accent transition-colors",
              selectedId === conversation.applicationId && "bg-accent",
              "relative group animate-in fade-in-0"
            )}
            onClick={() => onSelect(conversation.applicationId)}
          >
            <div className="flex items-start justify-between w-full">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-muted-foreground shrink-0" />
                <div className="text-left">
                  <h4 className="font-semibold line-clamp-1">{conversation.projectTitle}</h4>
                  {conversation.lastMessage && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {conversation.lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
              {conversation.unreadCount > 0 && (
                <Badge variant="default" className="ml-2">
                  {conversation.unreadCount}
                </Badge>
              )}
            </div>
            {conversation.updatedAt && (
              <span className="text-xs text-muted-foreground mt-1">
                {format(conversation.updatedAt, "MMM d, h:mm a")}
              </span>
            )}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};
