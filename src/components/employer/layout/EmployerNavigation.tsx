
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  BookOpen,
  ChevronRight
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface EmployerNavigationProps {
  onLogout: () => void;
  userName: string;
}

export const EmployerNavigation = ({ onLogout, userName }: EmployerNavigationProps) => {
  const { state, toggleSidebar } = useSidebar();
  
  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  const menuItems = [
    { title: "Dashboard", url: "/employer", icon: LayoutDashboard },
    { title: "Projects", url: "/employer/projects", icon: Briefcase },
    { title: "Applications", url: "/employer/applications", icon: ClipboardList },
    { title: "Resources", url: "/employer/resources", icon: BookOpen },
  ];

  return (
    <SidebarContent className="bg-[#1A1F2C] text-white">
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="text-xl font-bold">Employer Portal</h2>
          <p className="text-sm text-gray-400">Welcome back, {getFirstName(userName)}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10"
          onClick={toggleSidebar}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
      
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link
                  to={item.url}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-white/10 transition-colors"
                >
                  <item.icon size={16} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
