
import { NavLink } from "react-router-dom";
import { Home, PanelLeft, PanelRight } from "lucide-react";
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
  isMobile: boolean;
}

export const Navigation = ({ userName, navItems, isMobile }: NavigationProps) => {
  const { state } = useSidebar();

  const getFirstName = (fullName: string = "") => {
    return fullName.split(" ")[0] || "there";
  };

  const renderNavLink = (to: string, Icon: typeof Home, label: string, isActive: boolean, isMobileView: boolean) => {
    const className = isMobileView
      ? cn(
          "flex flex-col items-center p-2 text-gray-300 rounded-md transition-colors",
          isActive ? "text-white" : "hover:text-white"
        )
      : cn(
          "flex items-center text-gray-300 px-2 py-1.5 rounded-md transition-colors w-full",
          state === "collapsed" && "justify-center",
          isActive ? "bg-white/10" : "hover:bg-white/10"
        );

    return (
      <div className={className}>
        <Icon className={isMobileView ? "h-5 w-5" : "h-4 w-4"} />
        <span className={cn(
          isMobileView ? "text-xs mt-1 truncate max-w-[60px]" : "ml-2",
          !isMobileView && state === "collapsed" && "hidden"
        )}>
          {label}
        </span>
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            replace={true}
            className={({ isActive }) => cn(
              "flex flex-col items-center p-2 text-gray-300 rounded-md transition-colors",
              isActive ? "text-white" : "hover:text-white"
            )}
          >
            {({ isActive }) => renderNavLink(item.to, item.icon, item.label, isActive, true)}
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2 bg-[#1A1F2C]">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={state === "collapsed" ? "hidden" : "block"}>
          <h2 className="text-xl font-bold text-white">Participant Portal</h2>
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
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <NavLink
                    to={item.to}
                    replace={true}
                    className={({ isActive }) => cn(
                      "flex items-center text-gray-300 px-2 py-1.5 rounded-md transition-colors w-full",
                      state === "collapsed" && "justify-center",
                      isActive ? "bg-white/10" : "hover:bg-white/10"
                    )}
                  >
                    {({ isActive }) => renderNavLink(item.to, item.icon, item.label, isActive, false)}
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
