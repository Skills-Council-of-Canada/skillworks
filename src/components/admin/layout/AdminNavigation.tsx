
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  BarChart,
  Settings,
  HeadphonesIcon,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminNavigationProps {
  onLogout: () => void;
}

export const AdminNavigation = ({ onLogout }: AdminNavigationProps) => {
  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users", icon: Users, label: "User Management" },
    { to: "/admin/experiences", icon: BookOpen, label: "Experience Oversight" },
    { to: "/admin/projects", icon: Briefcase, label: "Project Management" },
    { to: "/admin/reports", icon: BarChart, label: "Reports & Analytics" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
    { to: "/admin/support", icon: HeadphonesIcon, label: "Support & Helpdesk" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <div className="mb-4 px-4 py-2">
          <h2 className="text-lg font-semibold">Admin Portal</h2>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                  isActive ? 'bg-accent' : ''
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
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
};
