
import { Card } from "@/components/ui/card";
import { NotificationType } from "@/types/educator";
import { 
  UserPlus,
  CheckSquare,
  AlertOctagon,
  ChartBar,
  Shield,
  Bell
} from "lucide-react";

interface NotificationTypesSidebarProps {
  selectedType: NotificationType | 'all';
  onTypeSelect: (type: NotificationType | 'all') => void;
}

const NotificationTypesSidebar = ({ selectedType, onTypeSelect }: NotificationTypesSidebarProps) => {
  const notificationTypes = {
    'all': { label: 'All Notifications', icon: Bell },
    'registration': { label: 'New Sign-Ups', icon: UserPlus },
    'project_approval': { label: 'Project Approvals', icon: CheckSquare },
    'system_alert': { label: 'System Alerts', icon: AlertOctagon },
    'user_engagement': { label: 'User Engagement', icon: ChartBar },
    'security': { label: 'Security & Compliance', icon: Shield }
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
