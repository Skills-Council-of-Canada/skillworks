
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

const AdminMessages = () => {
  // This would normally be driven by real data
  const hasNewRequests = true;

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 overflow-hidden">
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
              <DropdownMenuContent align="end" className="z-50" style={{ backgroundColor: 'white', backdropFilter: 'none' }}>
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
                <div className="p-4 border-b bg-background">
                  <h4 className="font-semibold">Chat Requests</h4>
                </div>
                <ScrollArea className="h-[300px] bg-background">
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

      <Separator orientation="vertical" />

      {/* Right Panel - Chat Window */}
      <div className="flex-1 bg-background border rounded-lg overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Messages</h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-blue-500 text-white rounded-lg p-3">
                  <p>Hello! How can I help you today?</p>
                  <span className="text-xs text-white/70 mt-1 block">12:30 PM</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-emerald-500 text-white rounded-lg p-3">
                  <p>I had a question about the project timeline.</p>
                  <span className="text-xs text-white/70 mt-1 block">12:31 PM</span>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
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
    <div className="border rounded-lg p-3 space-y-2 bg-background">
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

export default AdminMessages;
