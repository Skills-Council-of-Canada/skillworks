
import { Link } from "react-router-dom";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  userName: string;
  onLogout: () => void;
}

export const UserMenu = ({ userName, onLogout }: UserMenuProps) => {
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
          className="p-0 text-gray-600"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#1A1F2C] text-white">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm ml-2 hidden md:inline-block">
            {userName}
          </span>
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white [&>*]:bg-transparent [&>*]:text-inherit"
      >
        <DropdownMenuItem asChild>
          <Link to="/participant/profile" className="flex w-full items-center">
            <User size={16} className="mr-2" />
            <span>View Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/participant/settings" className="flex w-full items-center">
            <Settings size={16} className="mr-2" />
            <span>System Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onLogout}
          className="text-red-500"
        >
          <LogOut size={16} className="mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
