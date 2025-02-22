
import { useState } from "react";
import { Smile, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatWindow = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="border-b border-gray-700 p-4 bg-gray-900">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-white">John Doe</h3>
            <p className="text-sm text-gray-300">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Example messages */}
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="rounded-lg bg-gray-800 p-3">
              <p className="text-sm text-white">Hello! How can I help you today?</p>
              <span className="text-xs text-gray-300 mt-1 block">12:30 PM</span>
            </div>
          </div>

          <div className="flex items-start gap-2 max-w-[80%] ml-auto">
            <div className="rounded-lg bg-blue-500 p-3">
              <p className="text-sm text-white">I had a question about the project timeline.</p>
              <span className="text-xs text-blue-100 mt-1 block">12:31 PM ✓✓</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-gray-700 p-4 bg-gray-900">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-300"
          />
          <Button 
            size="icon" 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
