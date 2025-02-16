
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatRequestPanel = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Chat Requests</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <RequestItem
            name="Jane Smith"
            message="I would like to discuss the project requirements"
            timestamp="2 hours ago"
          />
          {/* Add more request items as needed */}
        </div>
      </ScrollArea>
    </div>
  );
};

interface RequestItemProps {
  name: string;
  message: string;
  timestamp: string;
}

const RequestItem = ({ name, message, timestamp }: RequestItemProps) => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-muted-foreground">{message}</p>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="default" size="sm" className="w-full">
          <Check className="h-4 w-4 mr-1" />
          Accept
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <X className="h-4 w-4 mr-1" />
          Reject
        </Button>
      </div>
    </div>
  );
};
