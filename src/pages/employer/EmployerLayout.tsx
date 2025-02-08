
import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
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
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  MessageSquare,
  BookOpen,
  LogOut,
  Users,
  Settings,
  ChevronDown,
  Bell,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/employer",
    tooltip: "View your dashboard",
  },
  {
    title: "Projects",
    icon: Briefcase,
    url: "/employer/projects",
    tooltip: "Manage your projects",
  },
  {
    title: "Applications",
    icon: Users,
    url: "/employer/applications",
    tooltip: "Review applications",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    url: "/employer/messages",
    tooltip: "Communicate with applicants",
  },
  {
    title: "Resources",
    icon: BookOpen,
    url: "/employer/resources",
    tooltip: "Access learning resources",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/employer/settings",
    tooltip: "Manage your settings",
  },
];

const EmployerLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find((item) => item.url === currentPath);
    return currentMenuItem?.title || "Dashboard";
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <TooltipProvider delayDuration={0}>
                    {menuItems.map((item) => (
                      <Tooltip key={item.title}>
                        <TooltipTrigger asChild>
                          <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                              <Link
                                to={item.url}
                                className="flex items-center gap-2 relative"
                              >
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={logout}
                        className="flex items-center gap-2 text-destructive hover:text-destructive"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </TooltipProvider>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 border-b flex items-center px-6 bg-card justify-between">
            <h1 className="text-2xl font-bold">{getCurrentPageTitle()}</h1>
            
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
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

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <HelpCircle className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Help & Support</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {getInitials(user?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm hidden md:inline-block">
                      {user?.name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Company Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={logout}
                  >
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>

          <footer className="h-16 border-t flex items-center justify-between px-6 text-sm text-muted-foreground">
            <div>© 2024 Skilled Trades Platform. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="/terms" className="hover:text-foreground">Terms</a>
              <a href="/privacy" className="hover:text-foreground">Privacy</a>
              <a href="/contact" className="hover:text-foreground">Contact</a>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmployerLayout;
