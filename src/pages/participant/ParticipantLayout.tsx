
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
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
  MessageSquare,
  PanelLeft,
  PanelRight
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
import { Sidebar, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavigationProps {
  userName: string | undefined;
  navItems: Array<{
    to: string;
    icon: React.ComponentType;
    label: string;
  }>;
}

const ParticipantLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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

  const navItems = [
    { to: "/participant/dashboard", icon: Home, label: "Dashboard" },
    { to: "/participant/tasks", icon: CheckSquare, label: "Tasks & Activity" },
    { to: "/participant/experiences", icon: BookOpen, label: "My Experiences" },
    { to: "/participant/mentors", icon: Users, label: "My Mentors" },
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <Navigation userName={user?.name} navItems={navItems} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 border-b bg-white flex items-center justify-between px-4 sm:px-6">
            <img 
              src="/lovable-uploads/f55205da-68be-4106-a1f8-a42fa33f103f.png" 
              alt="Skill Works Logo" 
              className="h-8"
            />

            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/participant/messages">
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <Link to="/participant/notifications">
                  <Bell className="h-5 w-5 text-[#1A1F2C]" />
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#1A1F2C] text-white">
                        {getInitials(user?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm hidden md:inline-block">
                      {user?.name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link to="/participant/profile" className="flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>View Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/participant/settings" className="flex w-full items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
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
    </SidebarProvider>
  );
};

const Navigation = ({ userName, navItems }: NavigationProps) => {
  const { state } = useSidebar();

  const getFirstName = (fullName: string = "") => {
    return fullName.split(" ")[0] || "there";
  };

  return (
    <div className="flex h-full flex-col gap-2 bg-[#1A1F2C]">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={state === "collapsed" ? "hidden" : "block"}>
          <h2 className="text-xl font-bold mb-1 text-white">Participant Portal</h2>
          <p className="text-sm text-gray-400">Welcome back, {getFirstName(userName)}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:text-white/80 p-0">
          {state === "collapsed" ? (
            <PanelRight className="h-5 w-5" />
          ) : (
            <PanelLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex-1 px-4">
        <div className="space-y-1 py-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex w-full items-center text-gray-300 px-2 py-1.5 rounded-md transition-colors",
                  state === "collapsed" && "justify-center",
                  isActive ? "bg-white/10" : "hover:bg-white/10"
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span className={cn("ml-2", state === "collapsed" && "hidden")}>
                {label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantLayout;
