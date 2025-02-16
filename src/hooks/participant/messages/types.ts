
import { Message } from "@/types/message";

export interface ChatInfo {
  name: string;
  memberCount?: number;
  type: 'direct' | 'group';
}

export interface UseMessageThreadReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  handleReactionAdd: (messageId: string, emoji: string) => Promise<void>;
  pinMessage: (messageId: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  editMessage: (messageId: string, content: string) => Promise<void>;
  searchMessages: (query: string) => Promise<any>;
  chatInfo?: ChatInfo;
}
