import { ChevronDown, Bell, User, MessageSquare, Settings, Menu } from "lucide-react";
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
import { useSidebar } from "@/components/ui/sidebar";

interface AdminHeaderProps {
  pageTitle: string;
  className?: string;
}

export const AdminHeader = ({ pageTitle, className = "" }: AdminHeaderProps) => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

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
    <header className={`h-16 border-b flex items-center px-4 md:px-6 bg-card justify-between ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {pageTitle === "Dashboard" ? (
          <img 
            src="/lovable-uploads/7d93f2b2-4e01-41c2-b87b-dbead3e8730b.png" 
            alt="Skills Works Logo" 
            className="h-8"
          />
        ) : (
          <h1 className="text-xl md:text-2xl font-semibold">{pageTitle}</h1>
        )}
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {user ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigate('/admin/messages')}
                    className="hidden md:inline-flex"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Messages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative hidden md:inline-flex"
                    onClick={() => navigate('/admin/notifications')}
                  >
                    <Bell className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#1A1F2C] text-white">
                      {getInitials(user?.name || "A")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm ml-2 font-medium hidden md:inline-block">
                    {user?.name || user?.email}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-white border-0"
              >
                <DropdownMenuItem 
                  onClick={() => navigate('/admin/messages')}
                  className="cursor-pointer md:hidden"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/admin/notifications')}
                  className="cursor-pointer md:hidden"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/admin/profile')}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/admin/settings')}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 cursor-pointer"
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
