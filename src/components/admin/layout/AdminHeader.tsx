
import { ChevronDown, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

interface AdminHeaderProps {
  pageTitle: string;
}

export const AdminHeader = ({ pageTitle }: AdminHeaderProps) => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const userResponse = await login("admin@skillscouncil.ca", "admin123!");
      if (userResponse && userResponse.role === 'admin') {
        navigate("/admin", { replace: true });
        toast({
          title: "Success",
          description: "Logged in as admin successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Unauthorized access",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Admin login failed:", error);
      toast({
        title: "Error",
        description: "Login failed",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="h-16 border-b flex items-center px-6 bg-card justify-between">
      <div className="flex items-center gap-2">
        {pageTitle === "Dashboard" ? (
          <img 
            src="/lovable-uploads/7d93f2b2-4e01-41c2-b87b-dbead3e8730b.png" 
            alt="Skills Works Logo" 
            className="h-8"
          />
        ) : (
          <h1 className="text-2xl font-semibold">{pageTitle}</h1>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative text-foreground hover:bg-transparent hover:text-foreground focus:text-foreground"
                    onClick={() => navigate('/admin/notifications')}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 pointer-events-auto hover:bg-transparent focus:bg-transparent active:bg-transparent"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#1A1F2C] text-white">
                      {getInitials(user?.name || "A")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">
                    {user?.name || user?.email}
                  </span>
                  <ChevronDown className="h-4 w-4 text-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-white border shadow-sm"
              >
                <DropdownMenuItem 
                  onClick={() => navigate('/admin/settings')}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button onClick={handleAdminLogin}>
            Admin Login
          </Button>
        )}
      </div>
    </header>
  );
};
