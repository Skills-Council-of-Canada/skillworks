
import { BellDot, MoreVertical } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChatList } from "@/components/educator/messages/ChatList";
import { ChatWindow } from "@/components/educator/messages/ChatWindow";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const EducatorMessages = () => {
  const hasNewRequests = true;
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const ChatListSidebar = () => (
    <div className="flex flex-col h-full">
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
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="text-foreground hover:bg-accent/50">Pin Chat</DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-accent/50">Mute Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive hover:bg-destructive/10">Delete Chat</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-accent/50">
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
      <ChatList />
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Mobile view */}
      {isMobile ? (
        <div className="flex flex-col w-full h-full">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="m-4"
              >
                Show Conversations
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <ChatListSidebar />
            </SheetContent>
          </Sheet>
          
          <div className="flex-1 bg-background border rounded-lg overflow-hidden mx-4 mb-4">
            <ChatWindow />
          </div>
        </div>
      ) : (
        /* Desktop view */
        <div className="flex gap-4 w-full p-4">
          <div className="w-80 flex-shrink-0 bg-background border rounded-lg overflow-hidden">
            <ChatListSidebar />
          </div>

          <Separator orientation="vertical" className="bg-border" />

          <div className="flex-1 bg-background border rounded-lg overflow-hidden">
            <ChatWindow />
          </div>
        </div>
      )}
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
        <h4 className="font-medium text-sm text-foreground">{name}</h4>
        <p className="text-sm text-muted-foreground">{message}</p>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
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

export default EducatorMessages;
