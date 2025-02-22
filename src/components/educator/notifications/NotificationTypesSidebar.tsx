
import { Card } from "@/components/ui/card";
import { NotificationType } from "@/hooks/useNotifications";
import { getNotificationIcon } from "@/components/educator/notifications/utils/notificationUtils";

interface NotificationTypesSidebarProps {
  selectedType: NotificationType | 'all';
  onTypeSelect: (type: NotificationType | 'all') => void;
}

export const NotificationTypesSidebar = ({ selectedType, onTypeSelect }: NotificationTypesSidebarProps) => {
  const notificationTypes = {
    'student_signup': 'Student Sign-ups',
    'progress_update': 'Progress Updates',
    'submission_reminder': 'Submissions',
    'feedback_request': 'Feedback Requests',
    'classroom_activity': 'Classroom Activity',
    'certification': 'Certifications'
  };

  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Notification Types</h2>
      <div className="space-y-2">
        {Object.entries(notificationTypes).map(([type, label]) => (
          <button
            key={type}
            className={`w-full text-left p-2 rounded ${
              selectedType === type ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
            onClick={() => onTypeSelect(type as NotificationType)}
          >
            <span className="flex items-center gap-2">
              {getNotificationIcon(type as NotificationType)}
              {label}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
};
