
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { EmployerHeader } from "@/components/employer/layout/EmployerHeader";
import { EmployerFooter } from "@/components/employer/layout/EmployerFooter";
import { EmployerNavigation } from "@/components/employer/layout/EmployerNavigation";

const EmployerLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getCurrentPageTitle = () => {
    const menuItems = [
      { url: "/employer", title: "Dashboard" },
      { url: "/employer/projects", title: "Projects" },
      { url: "/employer/applications", title: "Applications" },
      { url: "/employer/messages", title: "Messages" },
      { url: "/employer/resources", title: "Resources" },
      { url: "/employer/settings", title: "Settings" },
    ];
    const currentMenuItem = menuItems.find((item) => item.url === location.pathname);
    return currentMenuItem?.title || "Dashboard";
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <EmployerNavigation onLogout={logout} userName={user?.name} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <EmployerHeader pageTitle={getCurrentPageTitle()} />
          
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <Outlet />
          </main>

          <EmployerFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmployerLayout;
