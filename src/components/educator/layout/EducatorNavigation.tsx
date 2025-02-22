
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Search,
  Briefcase,
  UserCheck,
  PanelLeft,
  PanelRight
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

interface EducatorNavigationProps {
  userName: string;
  isMobile: boolean;
}

export const EducatorNavigation = ({ userName, isMobile }: EducatorNavigationProps) => {
  const { state } = useSidebar();

  const menuItems = [
    { title: "Dashboard", path: "/educator/dashboard", icon: LayoutDashboard },
    { title: "Experiences", path: "/educator/experiences", icon: BookOpen },
    { title: "Students", path: "/educator/students", icon: Users },
    { title: "Matches", path: "/educator/matches", icon: UserCheck },
    { title: "Find Portal", path: "/educator/portals", icon: Search },
    { title: "Find Project", path: "/educator/projects", icon: Briefcase },
  ];

  if (isMobile) {
    return (
      <div className="flex justify-around items-center p-2">
        {menuItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center p-2 text-gray-300 rounded-md transition-colors",
                isActive ? "text-white" : "hover:text-white"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.title}</span>
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2 bg-[#1A1F2C]">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={state === "collapsed" ? "hidden" : "block"}>
          <h2 className="text-xl font-bold text-white">Educator Portal</h2>
          <p className="text-sm text-gray-400">Welcome back, {userName}</p>
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
                <SidebarMenuItem key={item.path}>
                  <NavLink
                    to={item.path}
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
