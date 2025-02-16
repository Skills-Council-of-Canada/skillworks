
import { format } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MessageReactions } from "./MessageReactions";
import type { Message } from "@/types/message";

interface MessageBubbleProps {
  message: Message;
  onReactionAdd: (messageId: string, emoji: string) => void;
}

export const MessageBubble = ({ message, onReactionAdd }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "message-bubble flex items-start gap-3 group animate-in fade-in-0",
        message.senderType === "learner" && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0 border-2 border-background shadow-md" />
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div
          className={cn(
            "rounded-lg p-3 shadow-sm",
            message.senderType === "learner"
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-muted/50 backdrop-blur-sm rounded-tl-none"
          )}
        >
          <p className="text-sm break-words leading-relaxed">{message.content}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground/70">
            {format(message.timestamp, "p")}
          </span>
          <MessageReactions
            messageId={message.id}
            reactions={message.reactions || []}
            onReactionAdd={(emoji) => onReactionAdd(message.id, emoji)}
          />
        </div>
      </div>
    </div>
  );
};
