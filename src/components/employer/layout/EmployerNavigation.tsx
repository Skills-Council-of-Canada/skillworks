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

interface EmployerNavigationProps {
  onLogout: () => void;
  userName: string;
}

export const EmployerNavigation = ({ onLogout, userName }: EmployerNavigationProps) => {
  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  return (
    <SidebarContent className="bg-[#1A1F2C] text-white">
      <div className="p-4 mb-4">
        <h2 className="text-xl font-bold mb-1">Employer Portal</h2>
        <p className="text-sm text-gray-400">Welcome back, {getFirstName(userName)}</p>
      </div>
      <SidebarGroup>
        <SidebarGroupLabel className="text-gray-400">Menu</SidebarGroupLabel>
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
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={onLogout}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors"
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
