
import { useState } from "react";
import { Search, Plus, MessageSquare, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const ChatList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-500"
            />
          </div>
          <Button 
            size="icon" 
            variant="outline"
            className="border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 px-2">Direct Messages</h3>
            {/* Direct Messages List */}
            <ChatListItem
              name="John Doe"
              message="Latest message here"
              unreadCount={2}
              active={true}
              timestamp="12:30 PM"
            />
            {/* Add more direct message items */}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 px-2">Group Chats</h3>
            {/* Group Chats List */}
            <ChatListItem
              name="Project Alpha Team"
              message="Team discussion about..."
              isGroup={true}
              timestamp="Yesterday"
            />
            {/* Add more group chat items */}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

interface ChatListItemProps {
  name: string;
  message: string;
  timestamp: string;
  unreadCount?: number;
  isGroup?: boolean;
  active?: boolean;
}

const ChatListItem = ({ name, message, timestamp, unreadCount, isGroup, active }: ChatListItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full flex flex-col items-start p-3 h-auto gap-1",
        "hover:bg-gray-800/50 text-left",
        active ? "bg-gray-800" : "bg-transparent",
        "text-gray-100"
      )}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-3">
          {isGroup ? (
            <Users className="h-8 w-8 text-gray-400" />
          ) : (
            <MessageSquare className="h-8 w-8 text-gray-400" />
          )}
          <div>
            <h4 className="font-semibold line-clamp-1 text-gray-100">{name}</h4>
            <p className="text-sm text-gray-400 line-clamp-1">{message}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-gray-500">{timestamp}</span>
          {unreadCount && unreadCount > 0 && (
            <Badge 
              variant="default" 
              className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-600 text-white"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </Button>
  );
};
