
import { Link } from "react-router-dom";
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface EmployerNavigationProps {
  onLogout: () => void;
  userName: string;
}

export const EmployerNavigation = ({ onLogout, userName }: EmployerNavigationProps) => {
  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  const menuItems = [
    { title: "Dashboard", url: "/employer", icon: LayoutDashboard },
    { title: "Projects", url: "/employer/projects", icon: Briefcase },
    { title: "Applications", url: "/employer/applications", icon: ClipboardList },
    { title: "Messages", url: "/employer/messages", icon: MessageSquare },
    { title: "Resources", url: "/employer/resources", icon: BookOpen },
  ];

  return (
    <SidebarContent className="bg-[#1A1F2C] text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold">Employer Portal</h2>
        <p className="text-sm text-gray-400">Welcome back, {getFirstName(userName)}</p>
      </div>
      
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className="flex items-center gap-2 relative hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
