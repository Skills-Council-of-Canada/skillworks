
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MessageBubbleProps {
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
  status?: "sent" | "delivered" | "read";
}

export const MessageBubble = ({ content, timestamp, isCurrentUser, status }: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex items-start gap-2 max-w-[80%] animate-in fade-in-0 slide-in-from-bottom-1",
        isCurrentUser && "ml-auto"
      )}
    >
      <div
        className={cn(
          "rounded-lg p-3",
          isCurrentUser
            ? "bg-emerald-500 text-white rounded-tr-none"
            : "bg-blue-500 text-white rounded-tl-none"
        )}
      >
        <p className="text-sm break-words">{content}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className={cn(
            "text-xs",
            isCurrentUser ? "text-emerald-100" : "text-blue-100"
          )}>
            {format(timestamp, "p")}
          </span>
          {isCurrentUser && status && (
            <span className="text-xs text-emerald-100">
              {status === "read" ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
