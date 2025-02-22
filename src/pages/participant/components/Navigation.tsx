
import { NavLink } from "react-router-dom";
import { 
  Home,
  CheckSquare,
  BookOpen, 
  Users,
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

interface NavigationProps {
  userName: string | undefined;
  navItems: Array<{
    to: string;
    icon: typeof Home;
    label: string;
  }>;
}

export const Navigation = ({ userName, navItems }: NavigationProps) => {
  const { state } = useSidebar();

  const getFirstName = (fullName: string = "") => {
    return fullName.split(" ")[0] || "there";
  };

  return (
    <div className="flex h-full flex-col gap-2 bg-[#1A1F2C]">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={state === "collapsed" ? "hidden" : "block"}>
          <h2 className="text-xl font-bold mb-1 text-white">Participant Portal</h2>
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
                    <Icon size={16} />
                    <span className={cn("ml-2", state === "collapsed" && "hidden")}>
                      {label}
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
