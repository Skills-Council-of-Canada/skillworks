
import { useState } from "react";
import { format } from "date-fns";
import { Message } from "@/types/message";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MoreVertical, 
  Reply, 
  Pin, 
  Edit, 
  Trash, 
  Check 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageReactions } from "./MessageReactions";

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  onReply: (messageId: string) => void;
  onPin: (messageId: string) => void;
  onEdit: (messageId: string) => void;
  onDelete: (messageId: string) => void;
  onReactionAdd: (messageId: string, emoji: string) => void;
}

export const ChatMessage = ({
  message,
  isCurrentUser,
  onReply,
  onPin,
  onEdit,
  onDelete,
  onReactionAdd,
}: ChatMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const handleEditSubmit = () => {
    onEdit(message.id);
    setIsEditing(false);
  };

  const canEdit = isCurrentUser && 
    (!message.editedAt || Date.now() - new Date(message.editedAt).getTime() < 10000);

  return (
    <div
      className={cn(
        "flex items-start gap-3 group animate-in fade-in-0",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback>
          {message.senderType === "learner" ? "L" : "E"}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1 max-w-[80%]">
        {isEditing ? (
          <div className="flex items-end gap-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-muted resize-none"
              rows={2}
            />
            <Button size="sm" onClick={handleEditSubmit}>
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "rounded-lg p-3 shadow-sm",
              isCurrentUser
                ? "bg-primary text-primary-foreground rounded-tr-none"
                : "bg-muted/50 backdrop-blur-sm rounded-tl-none"
            )}
          >
            <p className="text-sm break-words leading-relaxed">
              {message.content}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground/70">
            {format(message.timestamp, "p")}
            {message.isEdited && " (edited)"}
          </span>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <MessageReactions
              messageId={message.id}
              reactions={message.reactions || []}
              onReactionAdd={onReactionAdd}
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onReply(message.id)}
            >
              <Reply className="h-4 w-4" />
            </Button>

            {isCurrentUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onPin(message.id)}>
                    <Pin className="mr-2 h-4 w-4" />
                    {message.isPinned ? "Unpin" : "Pin"}
                  </DropdownMenuItem>
                  {canEdit && (
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    onClick={() => onDelete(message.id)}
                    className="text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
