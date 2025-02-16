
import { useState } from "react";
import { Search, Users, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  title: string;
  memberCount?: number;
  onSearch: (query: string) => void;
  onManageMembers?: () => void;
  type: 'direct' | 'group';
}

export const ChatHeader = ({ 
  title, 
  memberCount, 
  onSearch, 
  onManageMembers,
  type 
}: ChatHeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="border-b p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {type === 'group' && memberCount !== undefined && (
              <p className="text-sm text-muted-foreground">{memberCount} members</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSearch ? (
            <div className="flex-1 max-w-sm">
              <Input
                placeholder="Search messages..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full"
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}

          {type === 'group' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onManageMembers}
            >
              <Users className="h-4 w-4" />
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowSearch(!showSearch)}>
                {showSearch ? "Hide Search" : "Search Messages"}
              </DropdownMenuItem>
              {type === 'group' && (
                <DropdownMenuItem onClick={onManageMembers}>
                  Manage Members
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
