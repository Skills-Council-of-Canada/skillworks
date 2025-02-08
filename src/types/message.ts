
export interface Message {
  id: string;
  applicationId: string;
  senderId: string;
  senderType: 'employer' | 'learner';
  content: string;
  timestamp: Date;
  readAt?: Date;
  attachments?: {
    fileName: string;
    fileUrl: string;
    fileType: string;
  }[];
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

