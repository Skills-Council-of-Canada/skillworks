
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ConversationList } from "@/components/participant/messages/ConversationList";
import { MessageThread } from "@/components/participant/messages/MessageThread";
import { useMessages } from "@/hooks/participant/useMessages";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const { conversations, isLoading } = useMessages();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <Card className="p-4 md:col-span-1 overflow-hidden flex flex-col">
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversation}
            onSelect={setSelectedConversation}
          />
        </Card>

        {/* Message Thread */}
        <Card className="p-4 md:col-span-2 overflow-hidden flex flex-col">
          {selectedConversation ? (
            <MessageThread conversationId={selectedConversation} />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;
