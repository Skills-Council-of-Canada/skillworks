
import { useState } from "react";
import { MessageSquare, Search, BellDot, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageThread } from "@/components/participant/messages/MessageThread";
import { ConversationList } from "@/components/participant/messages/ConversationList";
import { useMessages } from "@/hooks/participant/useMessages";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageSettings } from "@/components/participant/messages/MessageSettings";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { conversations, isLoading } = useMessages();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const hasNewRequests = true; // This would normally be driven by real data

  const filteredConversations = conversations.filter(conv => 
    conv.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <MessageSquare className="h-8 w-8 text-muted-foreground/50 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 overflow-hidden p-4">
      {/* Left Panel - Chat List */}
      <div className="w-80 flex-shrink-0 bg-background border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Conversations</h3>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                <DropdownMenuItem className="focus:bg-accent">Pin Chat</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-accent">Mute Notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-accent">Delete Chat</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <BellDot className="h-5 w-5" />
                  {hasNewRequests && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
                    >
                      2
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-0 bg-background border shadow-lg rounded-lg" 
                align="end"
                sideOffset={5}
              >
                <div className="p-4 border-b">
                  <h4 className="font-semibold">Message Requests</h4>
                </div>
                <ScrollArea className="h-[300px]">
                  <div className="p-4 space-y-4">
                    <RequestItem
                      name="Jane Smith"
                      message="I would like to discuss the project"
                      timestamp="2 hours ago"
                    />
                    <RequestItem
                      name="Mike Johnson"
                      message="Can we connect about the opportunity?"
                      timestamp="3 hours ago"
                    />
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 bg-background/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ConversationList
          conversations={filteredConversations}
          selectedId={selectedConversation}
          onSelect={setSelectedConversation}
        />
      </div>

      <Separator orientation="vertical" />

      {/* Right Panel - Chat Window */}
      <div className="flex-1 bg-background border rounded-lg overflow-hidden">
        {selectedConversation ? (
          <MessageThread conversationId={selectedConversation} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 space-y-4">
            <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-medium">No Conversation Selected</h3>
            <p className="text-sm text-center text-muted-foreground/70">
              Select a conversation from the list to start messaging.
            </p>
          </div>
        )}
      </div>

      {/* Settings Sheet */}
      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Message Settings</SheetTitle>
          </SheetHeader>
          <MessageSettings />
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface RequestItemProps {
  name: string;
  message: string;
  timestamp: string;
}

const RequestItem = ({ name, message, timestamp }: RequestItemProps) => {
  return (
    <div className="border rounded-lg p-3 space-y-2">
      <div>
        <h4 className="font-semibold text-sm">{name}</h4>
        <p className="text-sm text-muted-foreground">{message}</p>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="w-full">Accept</Button>
        <Button size="sm" variant="outline" className="w-full">Decline</Button>
      </div>
    </div>
  );
};

export default Messages;
