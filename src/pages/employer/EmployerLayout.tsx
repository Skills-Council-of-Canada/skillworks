
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { EmployerHeader } from "@/components/employer/layout/EmployerHeader";
import { EmployerFooter } from "@/components/employer/layout/EmployerFooter";
import { EmployerNavigation } from "@/components/employer/layout/EmployerNavigation";

const EmployerLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getCurrentPageTitle = () => {
    const menuItems = [
      { url: "/employer", title: "Dashboard" },
      { url: "/employer/projects", title: "Projects" },
      { url: "/employer/applications", title: "Applications" },
      { url: "/employer/resources", title: "Resources" },
      { url: "/employer/settings", title: "Settings" },
    ];
    const currentMenuItem = menuItems.find((item) => item.url === location.pathname);
    return currentMenuItem?.title || "Dashboard";
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar */}
        <Sidebar collapsible="icon" className="hidden md:flex border-r">
          <EmployerNavigation userName={user?.name || ""} isMobile={false} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <EmployerHeader pageTitle={getCurrentPageTitle()} />
          
          <main className="flex-1 overflow-auto pb-16 md:pb-0">
            <div className="p-4 sm:p-6">
              <Outlet />
            </div>
          </main>

          <EmployerFooter />

          {/* Mobile navigation bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C] border-t border-white/10 md:hidden">
            <EmployerNavigation userName={user?.name || ""} isMobile={true} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmployerLayout;
