
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
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left sidebar with conversations */}
      <div className="w-80 flex flex-col gap-4">
        <Card className="flex-1 border-none shadow-md bg-card/50">
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
        "flex-1 transition-opacity duration-200",
        !selectedConversation && "opacity-50 pointer-events-none"
      )}>
        {selectedConversation ? (
          <Card className="h-full border-none shadow-md bg-card/50">
            <MessageThread conversationId={selectedConversation} />
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center border-none shadow-md bg-card/50">
            <div className="text-muted-foreground flex flex-col items-center gap-2">
              <svg
                className="h-12 w-12 text-muted-foreground/50"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
              </svg>
              <p>Select a conversation to start messaging</p>
            </div>
          </Card>
        )}
      </div>

      {/* Right sidebar with settings */}
      <div className="w-80">
        <Card className="border-none shadow-md bg-card/50">
          <MessageSettings />
        </Card>
      </div>
    </div>
  );
};

export default EducatorMessages;
