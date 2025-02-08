
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
                  onClick={onLogout}
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
  );
};
