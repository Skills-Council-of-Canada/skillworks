
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronDown,
  UserCircle,
  Settings,
  LogOut,
  Bell
} from "lucide-react";

interface UserMenuProps {
  onLogout: () => void;
  userName?: string;
  showNotifications?: boolean;
  avatarUrl?: string;
}

export const UserMenu = ({ onLogout, userName, showNotifications = false, avatarUrl }: UserMenuProps) => {
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 hover:bg-transparent text-foreground hover:text-foreground"
        >
          <Avatar className="h-8 w-8">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={userName} />
            ) : (
              <AvatarFallback className="bg-[#1A1F2C] text-white">
                {getInitials(userName || "U")}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm hidden md:inline-block">
            {userName}
          </span>
          <ChevronDown className="h-4 w-4 hidden md:inline-block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 z-50 bg-white shadow-lg" 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/participant/profile" className="cursor-pointer">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        {showNotifications && (
          <DropdownMenuItem asChild>
            <Link to="/participant/notifications" className="cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to="/participant/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
