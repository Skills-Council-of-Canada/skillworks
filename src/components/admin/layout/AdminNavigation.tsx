
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Briefcase,
  FolderKanban,
  MessageSquare,
  LineChart,
  Settings,
  LogOut,
} from "lucide-react";

interface AdminNavigationProps {
  userName: string;
  onLogout: () => void;
}

export const AdminNavigation = ({ userName, onLogout }: AdminNavigationProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Experiences", path: "/admin/experiences", icon: Briefcase },
    { name: "Projects", path: "/admin/projects", icon: FolderKanban },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare },
    { name: "Reports", path: "/admin/reports", icon: LineChart },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Admin Panel</h2>
        </div>
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 mx-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-auto p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center py-2 px-3 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};
