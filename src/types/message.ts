
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
  mentions?: string[];
}

export interface Conversation {
  applicationId: string;
  projectId: string;
  projectTitle: string;  // Added this property
  employerId: string;
  learnerId: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
  isOnline?: boolean;
  participantCount?: number;
  type: 'direct' | 'group';
  name?: string;
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
