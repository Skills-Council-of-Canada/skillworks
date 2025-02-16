
import { useRef, useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessageThread } from "@/hooks/participant/useMessageThread";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface MessageThreadProps {
  conversationId: string;
}

export const MessageThread = ({ conversationId }: MessageThreadProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    handleReactionAdd,
    pinMessage,
    deleteMessage,
    editMessage,
    searchMessages, // This will be added to the hook
    chatInfo // This will be added to the hook
  } = useMessageThread(conversationId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchMessages(query);
    }
  };

  const handleManageMembers = () => {
    // This will be implemented when we add the member management UI
    toast({
      title: "Coming Soon",
      description: "Member management will be available soon.",
    });
  };

  const handlePinMessage = async (messageId: string) => {
    try {
      await pinMessage(messageId);
      toast({
        title: "Message pinned",
        description: "The message has been pinned to this conversation.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to pin message.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
      toast({
        title: "Message deleted",
        description: "The message has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  const handleEditMessage = async (messageId: string, content: string) => {
    try {
      await editMessage(messageId, content);
      toast({
        title: "Message edited",
        description: "Your message has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to edit message.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-background/50">
        <MessageSquare className="h-8 w-8 text-muted-foreground/50 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        title={chatInfo?.name || "Messages"}
        memberCount={chatInfo?.memberCount}
        onSearch={handleSearch}
        onManageMembers={handleManageMembers}
        type={chatInfo?.type || 'direct'}
      />
      <ScrollArea ref={scrollRef} className="flex-1 px-4 py-6 bg-background/80">
        <div className="space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.senderId === user?.id}
              onReply={(id) => console.log("Reply to:", id)}
              onPin={handlePinMessage}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
              onReactionAdd={handleReactionAdd}
            />
          ))}
        </div>
      </ScrollArea>
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};
