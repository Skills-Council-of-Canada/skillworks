
import { ChevronDown } from "lucide-react";
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
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-foreground hover:text-foreground focus:text-foreground"
            style={{ backgroundColor: 'transparent' }}
          >
            <Avatar className="h-8 w-8 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(user?.name || "")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm hidden md:inline-block font-medium">
              {user?.name}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 bg-white border shadow-lg" 
          align="end"
        >
          <DropdownMenuItem 
            className="text-foreground hover:bg-gray-100 focus:bg-gray-100 focus:text-foreground cursor-pointer"
            onClick={() => navigate('/educator/settings')}
          >
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-foreground hover:bg-gray-100 focus:bg-gray-100 focus:text-foreground cursor-pointer"
            onClick={() => navigate('/educator/settings')}
          >
            Portal Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive hover:bg-gray-100 focus:bg-gray-100 focus:text-destructive cursor-pointer"
            onClick={logout}
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
