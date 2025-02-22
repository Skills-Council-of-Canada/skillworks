
import { Card } from "@/components/ui/card";
import { NotificationType } from "@/types/educator";
import { 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  FileText, 
  Star, 
  Trophy,
  Bell
} from "lucide-react";

interface NotificationTypesSidebarProps {
  selectedType: NotificationType | 'all';
  onTypeSelect: (type: NotificationType | 'all') => void;
}

const NotificationTypesSidebar = ({ selectedType, onTypeSelect }: NotificationTypesSidebarProps) => {
  const notificationTypes = {
    'all': { label: 'All Notifications', icon: Bell },
    [NotificationType.APPLICATION_STATUS]: { label: 'Application Status', icon: CheckCircle },
    [NotificationType.TASK_ASSIGNMENT]: { label: 'Task Assignments', icon: FileText },
    [NotificationType.SUBMISSION_REMINDER]: { label: 'Submission Deadlines', icon: Clock },
    [NotificationType.FEEDBACK_RECEIVED]: { label: 'Feedback Received', icon: Star },
    [NotificationType.CHAT_MESSAGE]: { label: 'Chat Messages', icon: MessageSquare },
    [NotificationType.EXPERIENCE_COMPLETION]: { label: 'Experience Completion', icon: Trophy }
  };

  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Notification Types</h2>
      <div className="space-y-2">
        {Object.entries(notificationTypes).map(([type, { label, icon: Icon }]) => (
          <button
            key={type}
            className={`w-full text-left p-2 rounded flex items-center gap-2 ${
              selectedType === type ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
            onClick={() => onTypeSelect(type as NotificationType | 'all')}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default NotificationTypesSidebar;
