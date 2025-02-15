
export interface Message {
  id: string;
  applicationId: string;
  senderId: string;
  senderType: 'employer' | 'learner';
  content: string;
  timestamp: Date;
  readAt?: Date;
}

export interface Conversation {
  applicationId: string;
  projectId: string;
  employerId: string;
  learnerId: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
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
}

export interface DatabaseApplication {
  id: string;
  employer_id: string;
  learner_id: string;
  project: {
    id: string;
    title: string;
  } | null;
  messages: DatabaseMessage[];
}
