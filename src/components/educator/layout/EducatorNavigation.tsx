
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Search,
  Briefcase,
  UserCheck,
  PanelLeft,
  PanelRight,
  ChevronLeft,
  ChevronRight
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
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface EducatorNavigationProps {
  userName: string;
  isMobile: boolean;
}

export const EducatorNavigation = ({ userName, isMobile }: EducatorNavigationProps) => {
  const { state } = useSidebar();
  const [page, setPage] = useState(0);

  const menuItems = [
    { 
      title: "Dashboard", 
      mobileTitle: "Home",
      path: "/educator/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      title: "Experiences", 
      mobileTitle: "Learn",
      path: "/educator/experiences", 
      icon: BookOpen 
    },
    { 
      title: "Students", 
      mobileTitle: "Students",
      path: "/educator/students", 
      icon: Users 
    },
    { 
      title: "Matches", 
      mobileTitle: "Matches",
      path: "/educator/matches", 
      icon: UserCheck 
    },
    { 
      title: "Find Portal", 
      mobileTitle: "Portal",
      path: "/educator/portals", 
      icon: Search 
    },
    { 
      title: "Find Project", 
      mobileTitle: "Project",
      path: "/educator/projects", 
      icon: Briefcase 
    },
  ];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (isMobile) {
    const startIdx = page * itemsPerPage;
    const visibleItems = menuItems.slice(startIdx, startIdx + itemsPerPage);

    return (
      <div className="flex items-center justify-between p-2 bg-[#1A1F2C]">
        {totalPages > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={prevPage}
            className="text-gray-300 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        
        <div className="flex-1 flex justify-around items-center">
          {visibleItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/educator/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center p-2 text-gray-300 rounded-md transition-colors",
                  isActive ? "text-white" : "hover:text-white"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1 truncate max-w-[60px]">{item.mobileTitle}</span>
            </NavLink>
          ))}
        </div>

        {totalPages > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={nextPage}
            className="text-gray-300 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2 bg-[#1A1F2C]">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className={state === "collapsed" ? "hidden" : "block"}>
          <h2 className="text-xl font-bold text-white">Educator Portal</h2>
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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/educator/dashboard"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center text-gray-300 px-2 py-1.5 rounded-md transition-colors w-full",
                        state === "collapsed" && "justify-center",
                        isActive ? "bg-white/10" : "hover:bg-white/10"
                      )
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span className={cn("ml-2", state === "collapsed" && "hidden")}>
                      {item.title}
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
