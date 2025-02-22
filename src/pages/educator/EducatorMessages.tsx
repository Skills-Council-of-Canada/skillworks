
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
      <div className="w-80 flex-shrink-0 bg-gray-950 border-gray-800 border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="font-semibold text-gray-100">Conversations</h3>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200 hover:bg-gray-800">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800">
                <DropdownMenuItem className="text-gray-200 hover:bg-gray-800">Pin Chat</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:bg-gray-800">Mute Notifications</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-gray-800">Delete Chat</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-gray-200 hover:bg-gray-800">
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
                className="w-80 p-0 bg-gray-900 border-gray-800" 
                align="end"
                sideOffset={5}
              >
                <div className="p-4 border-b border-gray-800">
                  <h4 className="font-semibold text-gray-100">Chat Requests</h4>
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

      <Separator orientation="vertical" className="bg-gray-800" />

      {/* Right Panel - Chat Window */}
      <div className="flex-1 bg-gray-950 border-gray-800 border rounded-lg overflow-hidden">
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
    <div className="border border-gray-800 rounded-lg p-3 space-y-2 bg-gray-900">
      <div>
        <h4 className="font-semibold text-sm text-gray-100">{name}</h4>
        <p className="text-sm text-gray-400">{message}</p>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Accept</Button>
        <Button size="sm" variant="outline" className="w-full border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-gray-200">
          Decline
        </Button>
      </div>
    </div>
  );
};

export default EducatorMessages;
