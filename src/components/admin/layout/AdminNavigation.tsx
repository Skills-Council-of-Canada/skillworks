
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  BarChart,
  PanelLeft,
  PanelRight,
  Settings,
  MessageSquare,
  LogOut
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

interface AdminNavigationProps {
  onLogout: () => void;
  userName: string;
  isMobile?: boolean;
}

export const AdminNavigation = ({ onLogout, userName, isMobile = false }: AdminNavigationProps) => {
  const { state } = useSidebar();

  const navItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/experiences", icon: BookOpen, label: "Experiences" },
    { to: "/admin/projects", icon: Briefcase, label: "Projects" },
    { to: "/admin/messages", icon: MessageSquare, label: "Messages" },
    { to: "/admin/reports", icon: BarChart, label: "Reports" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  if (isMobile) {
    return (
      <nav className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2 rounded-md",
                "text-gray-400 hover:text-white",
                isActive && "text-white"
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </nav>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2 bg-[#1A1F2C]">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={state === "collapsed" ? "hidden" : "block"}>
          <h2 className="text-xl font-bold text-white">Admin Portal</h2>
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
                    <Icon className="h-4 w-4" />
                    <span className={cn("ml-2", state === "collapsed" && "hidden")}>
                      {label}
                    </span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center text-gray-300 px-2 py-1.5 rounded-md transition-colors hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span className={cn("ml-2", state === "collapsed" && "hidden")}>
                    Logout
                  </span>
                </button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
};
