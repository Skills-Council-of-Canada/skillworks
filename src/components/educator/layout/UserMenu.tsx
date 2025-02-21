
import { ChevronDown, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-transparent">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gray-200">
              {getInitials(user?.name || "U")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm hidden md:inline-block">
            {user?.name}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg">
        <Link to="/participant/profile">
          <DropdownMenuItem className="hover:bg-gray-100">
            <User className="mr-2 h-4 w-4" />
            View Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="hover:bg-gray-100">
          Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 hover:bg-gray-100"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
