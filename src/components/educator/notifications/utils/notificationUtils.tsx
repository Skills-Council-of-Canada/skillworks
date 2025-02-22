
import { NotificationType } from "@/types/educator";

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.STUDENT_SIGNUP:
      return "User icon"
    case NotificationType.PROGRESS_UPDATE:
      return "Chart icon"
    case NotificationType.FEEDBACK_REQUEST:
      return "Message icon"
    case NotificationType.CLASSROOM_ACTIVITY:
      return "Book icon"
    case NotificationType.CERTIFICATION:
      return "Certificate icon"
    default:
      return "Bell icon"
  }
};

export const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case NotificationType.STUDENT_SIGNUP:
      return "blue"
    case NotificationType.PROGRESS_UPDATE:
      return "green"
    case NotificationType.FEEDBACK_REQUEST:
      return "yellow"
    case NotificationType.CLASSROOM_ACTIVITY:
      return "purple"
    case NotificationType.CERTIFICATION:
      return "red"
    default:
      return "gray"
  }
};
