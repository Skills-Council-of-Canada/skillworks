
export interface Message {
  id: string;
  applicationId: string;
  senderId: string;
  senderType: 'employer' | 'learner';
  content: string;
  timestamp: Date;
  readAt?: Date;
  isEdited?: boolean;
  editedAt?: Date;
  reactions?: { emoji: string; count: number }[];
  threadId?: string;
  isPinned?: boolean;
  attachments?: { name: string; url: string; type: string }[];
  replyTo?: string;
  mentions?: { id: string; name: string }[];
  chatType?: 'direct' | 'group';
  chatId?: string;
}

export interface Conversation {
  applicationId: string;
  projectId: string;
  projectTitle: string;
  employerId: string;
  learnerId: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
  isOnline?: boolean;
  participantCount?: number;
  type: 'direct' | 'group';
  name?: string;
  groupOwner?: string;
  members?: { id: string; role: 'owner' | 'admin' | 'member' }[];
}

export interface DatabaseMessage {
  id: string;
  application_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
  type: 'text';
  is_edited: boolean;
  edited_at: string | null;
  reactions: any[];
  thread_id: string | null;
  is_pinned: boolean;
  attachments: any[];
  mentions: { id: string; name: string }[];
  chat_type: 'direct' | 'group';
  chat_id: string;
}

export interface DatabaseApplication {
  id: string;
  employer_id: string | null;
  learner_id: string | null;
  last_message: string | null;
  last_message_at: string | null;
  project: {
    id: string;
    title: string;
  } | null;
  messages: DatabaseMessage[];
}

export interface ChatMember {
  id: string;
  chatId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}

export interface ChatRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  autoApproved: boolean;
  projectId?: string;
  createdAt: Date;
}
