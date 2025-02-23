
import { useState } from "react";
import { Smile, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatWindowProps {
  onMobileBack?: () => void;
}

export const ChatWindow = ({ onMobileBack }: ChatWindowProps) => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3 p-4 mt-8 md:mt-0">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-base text-foreground">John Doe</h3>
            <p className="text-sm text-emerald-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
            </Avatar>
            <div className="rounded-lg bg-accent p-3 max-w-[80%]">
              <p className="text-sm text-foreground">Hello! How can I help you today?</p>
              <span className="text-xs text-muted-foreground mt-1 block">12:30 PM</span>
            </div>
          </div>

          <div className="flex items-start gap-3 flex-row-reverse">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-primary/10 text-primary">ME</AvatarFallback>
            </Avatar>
            <div className="rounded-lg bg-primary p-3 max-w-[80%]">
              <p className="text-sm text-primary-foreground">I had a question about the project timeline.</p>
              <span className="text-xs text-primary-foreground/80 mt-1 block">12:31 PM ✓✓</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="sticky bottom-0 border-t p-4 bg-background">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
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
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
