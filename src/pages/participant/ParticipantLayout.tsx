
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
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar 
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavigationProps {
  userName: string | undefined;
  navItems: Array<{
    to: string;
    icon: typeof Home;
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="p-0 text-gray-600"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#1A1F2C] text-white">
                        {getInitials(user?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm ml-2 hidden md:inline-block">
                      {user?.name}
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
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    <LogOut size={16} className="mr-2" />
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
        <SidebarTrigger className="text-white hover:text-white/80">
          {state === "collapsed" ? <PanelRight size={20} /> : <PanelLeft size={20} />}
        </SidebarTrigger>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ to, icon: Icon, label }) => (
                <SidebarMenuItem key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        "flex w-full items-center text-gray-300 px-2 py-1.5 rounded-md transition-colors",
                        state === "collapsed" && "justify-center",
                        isActive ? "bg-white/10" : "hover:bg-white/10"
                      )
                    }
                  >
                    <Icon size={16} />
                    <span className={cn("ml-2", state === "collapsed" && "hidden")}>
                      {label}
                    </span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
};

export default ParticipantLayout;
