
import { useState, useRef } from "react";
import { SendHorizontal, PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/components/employer/project/media-uploads/uploadUtils";
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadFile(file, file.type.startsWith('image/') ? 'image' : 'document', 'messages');
      
      if (url) {
        const fileMessage = `[File Attachment: ${file.name}](${url})`;
        setNewMessage(prev => prev + (prev ? '\n' : '') + fileMessage);
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-4 border-t glass-effect">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write your message..."
            className="min-h-[80px] resize-none bg-background/80 focus:bg-background transition-colors duration-200"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            size="icon"
            variant="ghost"
            className="h-10 w-10"
            disabled={isUploading}
          >
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleSend}
            size="icon"
            className="h-10 w-10 shrink-0 subtle-shadow"
            disabled={!newMessage.trim() || isUploading}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
