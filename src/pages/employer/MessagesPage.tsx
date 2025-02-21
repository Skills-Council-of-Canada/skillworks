
import { BellDot, MoreVertical } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChatWindow } from "@/components/educator/messages/ChatWindow";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConversationList } from "@/components/employer/messages/ConversationList";

const MessagesPage = () => {
  // This would normally be driven by real data
  const hasNewRequests = true;

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 overflow-hidden">
      {/* Left Panel - Chat List */}
      <div className="w-80 flex-shrink-0 bg-background border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-foreground">Conversations</h3>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <MoreVertical className="h-4 w-4 text-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50 bg-background">
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground cursor-pointer text-foreground">
                  Pin Chat
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground cursor-pointer text-foreground">
                  Mute Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive hover:bg-destructive hover:text-destructive-foreground cursor-pointer">
                  Delete Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <BellDot className="h-5 w-5 text-foreground" />
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
                  <h4 className="font-semibold text-foreground">Chat Requests</h4>
                </div>
                <ScrollArea className="h-[300px]">
                  <div className="p-4 space-y-4">
                    <RequestItem
                      name="Jane Smith"
                      message="I would like to discuss the project requirements"
                      timestamp="2 hours ago"
                    />
                    <RequestItem
                      name="Mike Johnson"
                      message="Can we schedule a meeting?"
                      timestamp="3 hours ago"
                    />
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <ConversationList />
      </div>

      <Separator orientation="vertical" className="bg-border" />

      {/* Right Panel - Chat Window */}
      <div className="flex-1 bg-background border rounded-lg overflow-hidden">
        <ChatWindow />
      </div>
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
    <div className="border rounded-lg p-3 space-y-2 bg-background hover:bg-accent transition-colors">
      <div>
        <h4 className="font-semibold text-sm text-foreground">{name}</h4>
        <p className="text-sm text-foreground/80">{message}</p>
        <span className="text-xs text-foreground/70">{timestamp}</span>
      </div>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="w-full hover:bg-primary/90 transition-colors"
        >
          Accept
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default MessagesPage;
