
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { MessageThread } from "@/components/participant/messages/MessageThread";
import { ConversationList } from "@/components/participant/messages/ConversationList";
import { MessageSettings } from "@/components/participant/messages/MessageSettings";
import { useConversations } from "@/hooks/messages/useConversations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const EducatorMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { conversations, isLoading } = useConversations();

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
      {/* Left sidebar with conversations */}
      <div className="w-80 flex flex-col gap-4">
        <Card className="flex-1">
          <ScrollArea className="h-[calc(100vh-6rem)]">
            {isLoading ? (
              <div className="space-y-2 p-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              <ConversationList
                conversations={conversations}
                selectedId={selectedConversation}
                onSelect={setSelectedConversation}
              />
            )}
          </ScrollArea>
        </Card>
      </div>

      {/* Main chat area */}
      <div className={cn(
        "flex-1 transition-opacity",
        !selectedConversation && "opacity-50 pointer-events-none"
      )}>
        {selectedConversation ? (
          <MessageThread conversationId={selectedConversation} />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {/* Right sidebar with settings */}
      <div className="w-80">
        <Card>
          <MessageSettings />
        </Card>
      </div>
    </div>
  );
};

export default EducatorMessages;
