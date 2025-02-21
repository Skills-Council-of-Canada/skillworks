
import { BellDot } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChatList } from "@/components/educator/messages/ChatList";
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
import { MoreVertical } from "lucide-react";

const EducatorMessages = () => {
  const hasNewRequests = true;

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 overflow-hidden">
      {/* Left Panel - Chat List */}
      <div className="w-80 flex-shrink-0 bg-background border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-gray-900 dark:text-white">Conversations</h3>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Pin Chat</DropdownMenuItem>
                <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete Chat</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-700 dark:text-gray-300">
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
                className="w-80 p-0" 
                align="end"
                sideOffset={5}
              >
                <div className="p-4 border-b">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Chat Requests</h4>
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

      <Separator orientation="vertical" />

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
    <div className="border rounded-lg p-3 space-y-2">
      <div>
        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
        <span className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="w-full">Accept</Button>
        <Button size="sm" variant="outline" className="w-full">Decline</Button>
      </div>
    </div>
  );
};

export default EducatorMessages;
