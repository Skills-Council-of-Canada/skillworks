
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
      <div className="border-b border-gray-800 p-4 bg-gray-950">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-100">John Doe</h3>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Example messages */}
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="rounded-lg bg-gray-800 text-gray-100 p-3">
              <p className="text-sm">Hello! How can I help you today?</p>
              <span className="text-xs text-gray-400 mt-1 block">12:30 PM</span>
            </div>
          </div>

          <div className="flex items-start gap-2 max-w-[80%] ml-auto">
            <div className="rounded-lg bg-blue-600 text-white p-3">
              <p className="text-sm">I had a question about the project timeline.</p>
              <span className="text-xs text-blue-200 mt-1 block">12:31 PM ✓✓</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-gray-800 p-4 bg-gray-950">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-gray-200 hover:bg-gray-800"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-gray-200 hover:bg-gray-800"
          >
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-500"
          />
          <Button 
            size="icon" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
