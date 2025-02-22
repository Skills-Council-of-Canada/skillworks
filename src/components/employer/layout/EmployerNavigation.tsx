
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  BookOpen,
  PanelLeft,
  PanelRight,
  MessageSquare,
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface EmployerNavigationProps {
  userName: string;
  isMobile: boolean;
}

export const EmployerNavigation = ({ userName, isMobile }: EmployerNavigationProps) => {
  const { state } = useSidebar();
  
  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  const menuItems = [
    { title: "Dashboard", url: "/employer/dashboard", icon: LayoutDashboard },
    { title: "Projects", url: "/employer/projects", icon: Briefcase },
    { title: "Applications", url: "/employer/applications", icon: ClipboardList },
    { title: "Messages", url: "/employer/messages", icon: MessageSquare },
    { title: "Resources", url: "/employer/resources", icon: BookOpen },
  ];

  if (isMobile) {
    return null; // Mobile navigation is now handled in the header dropdown
  }

  return (
    <div className="flex h-full flex-col gap-2 bg-[#1A1F2C]">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={state === "collapsed" ? "hidden" : "block"}>
          <h2 className="text-xl font-bold text-white">Employer Portal</h2>
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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center text-gray-300 px-2 py-1.5 rounded-md transition-colors w-full",
                        state === "collapsed" && "justify-center",
                        isActive ? "bg-white/10" : "hover:bg-white/10"
                      )
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span className={cn("ml-2", state === "collapsed" && "hidden")}>
                      {item.title}
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
