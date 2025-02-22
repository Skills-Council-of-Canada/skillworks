
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban,
  ClipboardList,
  PieChart,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminNavigationProps {
  userName: string;
  onLogout: () => void;
  isMobile: boolean;
}

export function AdminNavigation({ userName, onLogout, isMobile }: AdminNavigationProps) {
  const location = useLocation();
  
  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: FolderKanban, label: "Experiences", href: "/admin/experiences" },
    { icon: ClipboardList, label: "Projects", href: "/admin/projects" },
    { icon: PieChart, label: "Reports", href: "/admin/reports" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
    { icon: Bell, label: "Notifications", href: "/admin/notifications" },
    { icon: User, label: "Profile", href: "/admin/profile" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  if (isMobile) {
    return (
      <nav className="flex justify-around items-center h-16 px-4 bg-[#1A1F2C]">
        {navigationItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center transition-colors",
              location.pathname === item.href
                ? "text-[#9b87f5]"
                : "text-white/60 hover:text-[#9b87f5]"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#1A1F2C]">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Admin Portal</h2>
        <p className="text-sm text-white/60">{userName}</p>
      </div>
      <nav className="space-y-1 p-4 flex-1">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
              location.pathname === item.href
                ? "bg-[#9b87f5]/10 text-[#9b87f5]"
                : "text-white/60 hover:bg-[#9b87f5]/10 hover:text-[#9b87f5]"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-[#9b87f5] hover:bg-[#9b87f5]/10 rounded-lg transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
