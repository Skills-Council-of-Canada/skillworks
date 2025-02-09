
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminFooter } from "@/components/admin/layout/AdminFooter";
import { AdminNavigation } from "@/components/admin/layout/AdminNavigation";
import { Toaster } from "@/components/ui/toaster";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  console.log("AdminLayout - Current user:", user);
  console.log("AdminLayout - Current path:", location.pathname);

  const getCurrentPageTitle = () => {
    const paths = {
      "/admin": "Dashboard",
      "/admin/users": "User Management",
      "/admin/experiences": "Experience Oversight",
      "/admin/projects": "Project Management",
      "/admin/reports": "Reports & Analytics",
      "/admin/settings": "Settings",
      "/admin/support": "Support & Helpdesk"
    };
    
    return paths[location.pathname] || "Dashboard";
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <AdminNavigation onLogout={logout} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <AdminHeader pageTitle={getCurrentPageTitle()} />
          
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>

          <AdminFooter />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default AdminLayout;
