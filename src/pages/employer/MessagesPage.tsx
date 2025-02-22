
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
import { useState } from "react";
import { cn } from "@/lib/utils";

const MessagesPage = () => {
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
  const hasNewRequests = true;

  // Helper function to determine if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Panel - Chat List */}
      <div
        className={cn(
          "w-full md:w-80 flex-shrink-0 bg-background border rounded-lg overflow-hidden",
          "transition-all duration-300 ease-in-out",
          "absolute md:relative",
          "h-full z-10",
          !isMobileListVisible && "translate-x-[-100%] md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-foreground">Conversations</h3>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-accent/50"
                >
                  <MoreVertical className="h-4 w-4 text-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50 bg-background">
                <DropdownMenuItem className="hover:bg-accent/50 text-foreground">
                  Pin Chat
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent/50 text-foreground">
                  Mute Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                  Delete Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-accent/50"
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

      {/* Right Panel - Chat Window */}
      <div 
        className={cn(
          "flex-1 bg-background border rounded-lg overflow-hidden",
          "transition-all duration-300 ease-in-out",
          isMobile && isMobileListVisible ? "hidden" : "block"
        )}
      >
        {/* Mobile back button */}
        {isMobile && !isMobileListVisible && (
          <Button
            variant="ghost"
            className="md:hidden m-2"
            onClick={() => setIsMobileListVisible(true)}
          >
            ← Back to conversations
          </Button>
        )}
        <ChatWindow onMobileBack={() => setIsMobileListVisible(true)} />
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
    <div className="border rounded-lg p-3 space-y-2 bg-background hover:bg-accent/50">
      <div>
        <h4 className="font-semibold text-sm text-foreground">{name}</h4>
        <p className="text-sm text-foreground/80">{message}</p>
        <span className="text-xs text-foreground/70">{timestamp}</span>
      </div>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="w-full hover:bg-primary/90"
        >
          Accept
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full text-foreground hover:bg-accent/50"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default MessagesPage;
