
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ConversationList } from "@/components/participant/messages/ConversationList";
import { MessageThread } from "@/components/participant/messages/MessageThread";
import { useMessages } from "@/hooks/participant/useMessages";
import { Input } from "@/components/ui/input";
import { Settings, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageSettings } from "@/components/participant/messages/MessageSettings";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { conversations, isLoading } = useMessages();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filteredConversations = conversations.filter(conv => 
    conv.projectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-4 py-6 h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
        {/* Conversations List */}
        <Card className="p-4 md:col-span-1 overflow-hidden flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <ConversationList
              conversations={filteredConversations}
              selectedId={selectedConversation}
              onSelect={setSelectedConversation}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {/* TODO: Implement new conversation */}}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
            <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Message Settings</SheetTitle>
                </SheetHeader>
                <MessageSettings />
              </SheetContent>
            </Sheet>
          </div>
        </Card>

        {/* Message Thread */}
        <Card className="p-0 md:col-span-2 overflow-hidden flex flex-col">
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
