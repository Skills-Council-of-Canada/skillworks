
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
      <div className="min-h-screen flex w-full bg-background text-foreground">
        {/* Desktop Sidebar */}
        <Sidebar collapsible="icon" className="hidden md:flex border-r">
          <EducatorNavigation userName={user?.name || ""} isMobile={false} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <EducatorHeader pageTitle={getCurrentPageTitle()} onLogout={logout} />
          
          <div className="flex-1 overflow-auto pb-16 md:pb-0">
            <main className="p-4 sm:p-6">
              <Outlet />
            </main>
          </div>

          <EducatorFooter />

          {/* Mobile navigation bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C] border-t border-white/10 md:hidden">
            <EducatorNavigation userName={user?.name || ""} isMobile={true} />
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default EducatorLayout;
