
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  MessageSquare,
  BookOpen,
  Users,
  Settings,
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
  {
    title: "Settings",
    icon: Settings,
    url: "/employer/settings",
  },
];

interface EmployerNavigationProps {
  onLogout: () => void;
}

export const EmployerNavigation = ({ onLogout }: EmployerNavigationProps) => {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
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
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={onLogout}
                className="flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
