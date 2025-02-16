
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MessageReactionsProps {
  messageId: string;
  reactions: { emoji: string; count: number }[];
  onReactionAdd: (emoji: string) => void;
}

const AVAILABLE_REACTIONS = ["👍", "❤️", "😂"];

export const MessageReactions = ({ messageId, reactions, onReactionAdd }: MessageReactionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleReactionClick = async (emoji: string) => {
    onReactionAdd(emoji);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-1">
      {reactions.map(({ emoji, count }) => (
        <Button
          key={emoji}
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs"
          onClick={() => handleReactionClick(emoji)}
        >
          {emoji} {count > 0 && <span className="ml-1">{count}</span>}
        </Button>
      ))}
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="flex gap-1">
            {AVAILABLE_REACTIONS.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleReactionClick(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
