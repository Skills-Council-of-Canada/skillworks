
import { Separator } from "@/components/ui/separator";
import { ChatList } from "@/components/educator/messages/ChatList";
import { ChatWindow } from "@/components/educator/messages/ChatWindow";
import { ChatRequestPanel } from "@/components/educator/messages/ChatRequestPanel";

const EducatorMessages = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 overflow-hidden">
      {/* Left Panel - Chat List */}
      <div className="w-80 flex-shrink-0 bg-background border rounded-lg overflow-hidden">
        <ChatList />
      </div>

      <Separator orientation="vertical" />

      {/* Center Panel - Chat Window */}
      <div className="flex-1 bg-background border rounded-lg overflow-hidden">
        <ChatWindow />
      </div>

      <Separator orientation="vertical" />

      {/* Right Panel - Chat Requests */}
      <div className="w-80 flex-shrink-0 bg-background border rounded-lg overflow-hidden">
        <ChatRequestPanel />
      </div>
    </div>
  );
};

export default EducatorMessages;
