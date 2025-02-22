
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string | undefined;
  onLogout: () => void;
}

export const Header = ({ userName, onLogout }: HeaderProps) => {
  return (
    <header className="border-b">
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
          <Link to="/participant/notifications" className="text-sm text-gray-500 hover:text-gray-900">
            Notifications
          </Link>
          <UserMenu onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};
