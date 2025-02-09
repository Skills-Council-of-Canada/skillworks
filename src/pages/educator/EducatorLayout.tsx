
import { useState } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
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

  // Check if user is an educator
  if (!user || user.role !== "educator") {
    console.log("User is not an educator, redirecting to unauthorized");
    return <Navigate to="/unauthorized" replace />;
  }

  const getCurrentPageTitle = () => {
    const menuItems = [
      { url: "/educator", title: "Dashboard" },
      { url: "/educator/experiences", title: "My Experiences" },
      { url: "/educator/portals", title: "Find a Portal" },
      { url: "/educator/projects", title: "Find a Project" },
      { url: "/educator/matches", title: "Match Requests" },
      { url: "/educator/tasks", title: "Tasks & Activities" },
      { url: "/educator/messages", title: "Messages" },
      { url: "/educator/calendar", title: "Calendar" },
      { url: "/educator/settings", title: "Settings" },
    ];
    
    const currentMenuItem = menuItems.find((item) => 
      location.pathname === item.url || 
      (location.pathname.startsWith(item.url) && item.url !== "/educator")
    );
    return currentMenuItem?.title || "Dashboard";
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <EducatorNavigation onLogout={logout} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <EducatorHeader pageTitle={getCurrentPageTitle()} />
          
          <main className="flex-1 p-6 overflow-auto">
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
