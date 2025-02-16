
export interface UseMessagesReturn {
  messages: Message[];
  isLoading: boolean;
}

export interface MessageMutations {
  handleReactionAdd: (messageId: string, emoji: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  pinMessage: (messageId: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  editMessage: (messageId: string, content: string) => Promise<void>;
}

export interface MessageSubscription {
  unsubscribe: () => void;
}
