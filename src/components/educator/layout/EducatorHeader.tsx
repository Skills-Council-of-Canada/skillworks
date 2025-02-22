
import { NotificationBell } from "./NotificationBell";
import { UserMenu } from "./UserMenu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Calendar, MessageSquare, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface EducatorHeaderProps {
  pageTitle: string;
  onLogout: () => void;
}

export const EducatorHeader = ({ pageTitle, onLogout }: EducatorHeaderProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="h-16 border-b flex items-center px-6 bg-card justify-between">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/f55205da-68be-4106-a1f8-a42fa33f103f.png" 
          alt="Skill Works Logo" 
          className="h-8"
          onClick={() => handleNavigation('/educator/dashboard')}
          style={{ cursor: 'pointer' }}
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleNavigation('/educator/calendar')}
          >
            <Calendar className="h-5 w-5" />
            <span className="sr-only">Calendar</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleNavigation('/educator/messages')}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleNavigation('/educator/tasks')}
          >
            <Activity className="h-5 w-5" />
            <span className="sr-only">Tasks & Activities</span>
          </Button>
        </div>
        <TooltipProvider>
          <NotificationBell />
          <UserMenu onLogout={onLogout} />
        </TooltipProvider>
      </div>
    </header>
  );
};
