
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  BarChart,
  Settings,
  LogOut,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminNavigationProps {
  onLogout: () => void;
  userName: string;
}

export const AdminNavigation = ({ onLogout, userName }: AdminNavigationProps) => {
  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/admin/users", icon: Users, label: "User Management" },
    { to: "/admin/experiences", icon: BookOpen, label: "Experience Oversight" },
    { to: "/admin/projects", icon: Briefcase, label: "Project Management" },
    { to: "/admin/messages", icon: MessageSquare, label: "Messages" },
    { to: "/admin/reports", icon: BarChart, label: "Reports & Analytics" },
    { to: "/admin/settings", icon: Settings, label: "System Settings" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1A1F2C] text-white">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold mb-1">Admin Portal</h2>
      </div>
      <div className="p-3">
        <nav className="space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-white/10 ${
                  isActive ? 'bg-white/10' : ''
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-white/10"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
};
