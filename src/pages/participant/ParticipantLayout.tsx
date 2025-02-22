
import { Link, Outlet, useNavigate } from "react-router-dom";
import { 
  LogOut, 
  User, 
  Home,
  CheckSquare,
  BookOpen, 
  Users,
  Settings,
  Bell,
  ChevronDown,
  Menu,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const ParticipantLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-200 ease-in-out
      `}>
        <div className="p-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-1">Participant Portal</h2>
            <p className="text-sm text-gray-400">Welcome back, {getFirstName(user?.name)}</p>
          </div>
          
          <nav className="space-y-2">
            <Link to="/participant/dashboard">
              <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/participant/tasks">
              <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
                <CheckSquare className="mr-2 h-4 w-4" />
                Tasks & Activity
              </Button>
            </Link>
            <Link to="/participant/experiences">
              <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
                <BookOpen className="mr-2 h-4 w-4" />
                My Experiences
              </Button>
            </Link>
            <Link to="/participant/mentors">
              <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
                <Users className="mr-2 h-4 w-4" />
                My Mentors
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <img 
              src="/lovable-uploads/f55205da-68be-4106-a1f8-a42fa33f103f.png" 
              alt="Skill Works Logo" 
              className="h-8"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/participant/messages">
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </Link>
              </Button>
            </div>

            <Link to="/participant/notifications">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-[#1A1F2C]" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#1A1F2C] text-white">
                      {getInitials(user?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm hidden md:inline-block">
                    {user?.name}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg">
                <Link to="/participant/profile">
                  <DropdownMenuItem className="hover:bg-gray-100">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                </Link>
                <Link to="/participant/settings">
                  <DropdownMenuItem className="hover:bg-gray-100">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParticipantLayout;
