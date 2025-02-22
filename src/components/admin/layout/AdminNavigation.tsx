
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  BarChart,
  PanelLeft,
  PanelRight
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

interface AdminNavigationProps {
  onLogout: () => void;
  userName: string;
}

export const AdminNavigation = ({ onLogout, userName }: AdminNavigationProps) => {
  const { state } = useSidebar();

  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/admin/users", icon: Users, label: "User Management" },
    { to: "/admin/experiences", icon: BookOpen, label: "Experience Oversight" },
    { to: "/admin/projects", icon: Briefcase, label: "Project Management" },
    { to: "/admin/reports", icon: BarChart, label: "Reports & Analytics" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1A1F2C] text-white">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={state === "collapsed" ? "hidden" : "block"}>
          <h2 className="text-xl font-bold mb-1">Admin Portal</h2>
          <p className="text-sm text-gray-400">Welcome back, {getFirstName(userName)}</p>
        </div>
        <SidebarTrigger className="text-white hover:text-white/80">
          {state === "collapsed" ? <PanelRight size={20} /> : <PanelLeft size={20} />}
        </SidebarTrigger>
      </div>

      <div className="p-3">
        <nav className="space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center ${state === "collapsed" ? "justify-center" : "gap-3"} rounded-lg px-3 py-2 text-sm transition-all hover:bg-white/10 ${
                  isActive ? 'bg-white/10' : ''
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className={state === "collapsed" ? "hidden" : "block truncate"}>
                {label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
