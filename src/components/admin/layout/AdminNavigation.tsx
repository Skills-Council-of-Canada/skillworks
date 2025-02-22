
import { Link } from "react-router-dom";
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

interface AdminNavigationProps {
  userName: string;
  onLogout: () => void;
  isMobile: boolean;
}

export function AdminNavigation({ userName, onLogout, isMobile }: AdminNavigationProps) {
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
      <nav className="flex justify-around items-center h-16 px-4">
        {navigationItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="space-y-2 py-4">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors w-full"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </nav>
  );
}
