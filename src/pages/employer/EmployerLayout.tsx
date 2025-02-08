
import { useState } from "react";
import { Outlet } from "react-router-dom";
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
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  MessageSquare,
  BookOpen,
  LogOut,
  Users,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/employer",
  },
  {
    title: "Projects",
    icon: Briefcase,
    url: "/employer/projects",
  },
  {
    title: "Applications",
    icon: Users,
    url: "/employer/applications",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    url: "/employer/messages",
  },
  {
    title: "Resources",
    icon: BookOpen,
    url: "/employer/resources",
  },
];

const EmployerLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={logout} className="flex items-center gap-2 text-destructive hover:text-destructive">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 border-b flex items-center px-6 bg-card">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Employer Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
            </div>
          </header>

          <main className="flex-1 p-6">
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

