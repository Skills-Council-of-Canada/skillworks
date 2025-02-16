
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
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
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 space-y-4 bg-background/50 rounded-lg border border-border/50">
        <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
        <p className="text-center text-sm">No conversations yet. Start a new chat to begin messaging.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-14rem)]">
      <div className="space-y-1 pr-4">
        {conversations.map((conversation) => (
          <Button
            key={conversation.applicationId}
            variant="ghost"
            className={cn(
              "w-full justify-start p-3 h-auto transition-all duration-200 hover:bg-primary/5 hover:shadow-sm",
              selectedId === conversation.applicationId && "bg-primary/10 shadow-sm"
            )}
            onClick={() => onSelect(conversation.applicationId)}
          >
            <div className="flex items-start gap-3 w-full">
              <div className="relative">
                <Avatar className="h-10 w-10 shrink-0 border-2 border-background shadow-sm" />
                {conversation.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background animate-pulse" />
                )}
              </div>
              <div className="flex-1 text-left space-y-1 overflow-hidden">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-medium truncate leading-none mt-1">
                    {conversation.projectId}
                  </p>
                  <span className="text-[11px] text-muted-foreground/70 shrink-0 mt-1.5">
                    {format(conversation.updatedAt, "MMM d")}
                  </span>
                </div>
                {conversation.lastMessage && (
                  <p className={cn(
                    "text-sm text-muted-foreground/90 line-clamp-2 break-words leading-snug",
                    conversation.unreadCount > 0 && "font-medium text-foreground"
                  )}>
                    {conversation.lastMessage.content}
                  </p>
                )}
                {conversation.unreadCount > 0 && (
                  <Badge variant="default" className="mt-1 shadow-sm bg-primary hover:bg-primary">
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
