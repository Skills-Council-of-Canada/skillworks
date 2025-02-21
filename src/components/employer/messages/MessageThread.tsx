
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Smile } from "lucide-react";

export const ChatWindow = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full flex-col">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Received message */}
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="rounded-lg bg-blue-500 text-white p-3">
              <p className="text-sm">Hi there! Thanks for reaching out.</p>
              <span className="text-xs text-blue-100 mt-1 block">10:30 AM</span>
            </div>
          </div>

          {/* Sent message */}
          <div className="flex items-start gap-2 max-w-[80%] ml-auto">
            <div className="rounded-lg bg-emerald-500 text-white p-3">
              <p className="text-sm">I wanted to discuss the project requirements.</p>
              <span className="text-xs text-emerald-100 mt-1 block">10:31 AM ✓✓</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-4 bg-background">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-600 hover:bg-blue-50">
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" className="bg-emerald-500 hover:bg-emerald-600 text-white">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
