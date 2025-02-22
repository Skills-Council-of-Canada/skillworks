
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  userName: string | undefined;
  onLogout: () => void;
}

export const Header = ({ userName, onLogout }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="border-b relative">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <Link to="/participant/dashboard" className="flex items-center">
            <img 
              src="/lovable-uploads/f55205da-68be-4106-a1f8-a42fa33f103f.png" 
              alt="Skill Works Logo" 
              className="h-8"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!isMobile && (
            <Link 
              to="/participant/notifications"
              className="text-gray-500 hover:text-gray-900"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Link>
          )}
          <UserMenu onLogout={onLogout} showNotifications={isMobile} />
        </div>
      </div>
    </header>
  );
};
