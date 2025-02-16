
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMessages } from "@/hooks/participant/useMessages";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const Messages = () => {
  const { conversations, isLoading } = useMessages();
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>
      
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search..."
          className="pl-9 w-full"
        />
      </div>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <Card
            key={conversation.applicationId}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">
                    {conversation.projectId}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {format(conversation.updatedAt, "M/d/yyyy")}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <Badge variant="default" className="bg-primary">New</Badge>
                )}
              </div>
              {conversation.lastMessage && (
                <p className="text-muted-foreground line-clamp-2">
                  {conversation.lastMessage.content}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Messages;
