
import { useState } from "react";
import { Smile, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWindowProps {
  onMobileBack?: () => void;
}

export const ChatWindow = ({ onMobileBack }: ChatWindowProps) => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="border-b p-4 bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-foreground">John Doe</h3>
            <p className="text-sm text-emerald-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="flex items-start gap-2 max-w-[80%]">
            <div className="rounded-lg bg-blue-500/90 p-3">
              <p className="text-sm text-white">Hello! How can I help you today?</p>
              <span className="text-xs text-white/80 mt-1 block">12:30 PM</span>
            </div>
          </div>

          <div className="flex items-start gap-2 max-w-[80%] ml-auto">
            <div className="rounded-lg bg-emerald-500/90 p-3">
              <p className="text-sm text-white">I had a question about the project timeline.</p>
              <span className="text-xs text-white/80 mt-1 block">12:31 PM ✓✓</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-4 bg-background">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-background text-foreground placeholder:text-muted-foreground"
          />
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
