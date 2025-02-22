
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  BookOpen,
  PanelLeft,
  PanelRight,
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

interface EmployerNavigationProps {
  userName: string;
}

export const EmployerNavigation = ({ userName }: EmployerNavigationProps) => {
  const { state } = useSidebar();
  
  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  const menuItems = [
    { title: "Dashboard", url: "/employer", icon: LayoutDashboard, end: true },
    { title: "Projects", url: "/employer/projects", icon: Briefcase },
    { title: "Applications", url: "/employer/applications", icon: ClipboardList },
    { title: "Resources", url: "/employer/resources", icon: BookOpen },
  ];

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
      
      <div className="flex-1 px-4">
        <div className="space-y-1 py-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center ${
                  state === "collapsed" ? "justify-center" : "gap-3"
                } rounded-lg px-3 py-2 text-sm transition-all hover:bg-white/10 ${
                  isActive ? "bg-white/10" : ""
                } text-white`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className={state === "collapsed" ? "hidden" : "block truncate"}>
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
