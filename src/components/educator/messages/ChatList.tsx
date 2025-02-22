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
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button 
            size="icon" 
            variant="outline"
            className="text-foreground hover:bg-accent/50"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground/70 px-2">Direct Messages</h3>
            <ChatListItem
              name="John Doe"
              message="Latest message here"
              unreadCount={2}
              active={true}
              timestamp="12:30 PM"
            />
            <ChatListItem
              name="Sarah Wilson"
              message="Thanks for the update"
              timestamp="11:45 AM"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground/70 px-2">Group Chats</h3>
            <ChatListItem
              name="Project Alpha Team"
              message="Team discussion about..."
              isGroup={true}
              timestamp="Yesterday"
            />
            <ChatListItem
              name="Design Team"
              message="New mockups review"
              isGroup={true}
              timestamp="2d ago"
            />
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
        "hover:bg-accent/50 text-left",
        active && "bg-accent/50",
        "transition-colors duration-200"
      )}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-3">
          {isGroup ? (
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-blue-500" />
            </div>
          )}
          <div>
            <h4 className="font-medium text-sm text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground line-clamp-1">{message}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          {unreadCount && unreadCount > 0 && (
            <Badge 
              variant="default" 
              className="h-5 w-5 flex items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </Button>
  );
};
