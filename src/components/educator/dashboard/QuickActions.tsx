
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button
        className="flex-1"
        variant="default"
        onClick={() => navigate("/educator/notifications")}
      >
        <Bell className="mr-2 h-4 w-4" />
        View Notifications
      </Button>
    </div>
  );
};
