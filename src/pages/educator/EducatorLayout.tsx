
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { EducatorHeader } from "@/components/educator/layout/EducatorHeader";
import { EducatorFooter } from "@/components/educator/layout/EducatorFooter";
import { EducatorNavigation } from "@/components/educator/layout/EducatorNavigation";
import { Toaster } from "@/components/ui/toaster";

const EducatorLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  console.log("EducatorLayout - Current user:", user);
  console.log("EducatorLayout - Current path:", location.pathname);

  const getCurrentPageTitle = () => {
    const paths = {
      "/educator": "Dashboard",
      "/educator/experiences": "My Experiences",
      "/educator/collaborations": "Collaborations",
      "/educator/portals": "Find a Portal",
      "/educator/projects": "Find a Project",
      "/educator/students": "Students",
      "/educator/matches": "Match Requests",
      "/educator/tasks": "Tasks & Activities",
      "/educator/messages": "Messages",
      "/educator/calendar": "Calendar",
      "/educator/settings": "Settings"
    };
    
    return paths[location.pathname] || "Dashboard";
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <EducatorNavigation onLogout={logout} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <EducatorHeader pageTitle={getCurrentPageTitle()} />
          
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <Outlet />
          </main>

          <EducatorFooter />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default EducatorLayout;
