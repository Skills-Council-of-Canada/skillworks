
import { useState, useRef, useEffect } from "react";
import { SendHorizontal, PaperclipIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/components/employer/project/media-uploads/uploadUtils";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

interface Mention {
  id: string;
  name: string;
  avatar?: string;
}

// Mock data - replace with actual user data from your application
const MOCK_MENTIONS: Mention[] = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
];

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
    } else if (e.key === "@") {
      setShowMentions(true);
    }
  };

  const handleMentionSelect = (user: Mention) => {
    const beforeCursor = newMessage.substring(0, cursorPosition);
    const afterCursor = newMessage.substring(cursorPosition);
    const newContent = `${beforeCursor}@[${user.name}](${user.id})${afterCursor}`;
    setNewMessage(newContent);
    setShowMentions(false);

    // Set focus back to textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
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

  const filteredMentions = MOCK_MENTIONS.filter(user =>
    user.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  return (
    <div className="p-4 border-t glass-effect">
      <div className="flex gap-2 items-end max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              setCursorPosition(e.target.selectionStart);
            }}
            onKeyPress={handleKeyPress}
            onClick={(e) => {
              const target = e.target as HTMLTextAreaElement;
              setCursorPosition(target.selectionStart);
            }}
            placeholder="Write your message... Use @ to mention someone"
            className="min-h-[80px] resize-none bg-background/80 focus:bg-background transition-colors duration-200 pr-20"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          
          {showMentions && (
            <Popover open={showMentions} onOpenChange={setShowMentions}>
              <PopoverContent className="w-[200px] p-0" side="top">
                <Command>
                  <CommandInput 
                    placeholder="Search people..." 
                    value={mentionSearch}
                    onValueChange={setMentionSearch}
                  />
                  <CommandEmpty>No users found.</CommandEmpty>
                  <CommandGroup>
                    {filteredMentions.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() => handleMentionSelect(user)}
                        className="cursor-pointer"
                      >
                        {user.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            size="icon"
            variant="ghost"
            className="h-10 w-10 hover:bg-primary/5"
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
