import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  user: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const AdminMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual data fetching
  const conversations: Conversation[] = [
    {
      id: "1",
      user: "John Doe",
      lastMessage: "When will the next session start?",
      timestamp: "2024-01-20T10:00:00",
      unread: true,
    },
    {
      id: "2",
      user: "Jane Smith",
      lastMessage: "Thanks for the update",
      timestamp: "2024-01-19T15:30:00",
      unread: false,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "John Doe",
      content: "When will the next session start?",
      timestamp: "2024-01-20T10:00:00",
      read: false,
    },
    {
      id: "2",
      sender: "Admin",
      content: "The next session starts next Monday at 9 AM",
      timestamp: "2024-01-20T10:05:00",
      read: true,
    },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // Add message sending logic here
    setMessageInput("");
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Messages</h1>
      </div>
      
      <div className="grid md:grid-cols-[300px,1fr] gap-4">
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="h-[500px]">
            <div className="space-y-2 p-4">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors",
                    selectedConversation === conv.id && "bg-gray-100"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {conv.user.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium truncate">{conv.user}</p>
                        <span className="text-xs text-gray-500">
                          {new Date(conv.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="bg-white rounded-lg border flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b">
                <h2 className="font-semibold">
                  {conversations.find(c => c.id === selectedConversation)?.user}
                </h2>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col max-w-[70%] space-y-1",
                        message.sender === "Admin" ? "ml-auto items-end" : "items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2",
                          message.sender === "Admin"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100"
                        )}
                      >
                        {message.content}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
