
import { Link } from "react-router-dom";
import { Bell, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

export const Header = ({ userName, onLogout }: HeaderProps) => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 sm:px-6">
      <Link to="/participant/dashboard">
        <img 
          src="/lovable-uploads/f55205da-68be-4106-a1f8-a42fa33f103f.png" 
          alt="Skill Works Logo" 
          className="h-8"
        />
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          asChild
          className="text-gray-600"
        >
          <Link to="/participant/messages">
            <MessageSquare size={20} />
          </Link>
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          asChild
          className="text-gray-600"
        >
          <Link to="/participant/notifications">
            <Bell size={20} />
          </Link>
        </Button>

        <UserMenu userName={userName} onLogout={onLogout} />
      </div>
    </header>
  );
};
