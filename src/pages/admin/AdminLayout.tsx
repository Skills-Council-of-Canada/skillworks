
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminFooter } from "@/components/admin/layout/AdminFooter";
import { AdminNavigation } from "@/components/admin/layout/AdminNavigation";
import { Toaster } from "@/components/ui/toaster";
import AdminDashboard from "./AdminDashboard";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  console.log("AdminLayout - Current user:", user);
  console.log("AdminLayout - Current path:", location.pathname);

  const getCurrentPageTitle = () => {
    const paths = {
      "/admin": "Dashboard",
      "/admin/dashboard": "Dashboard",
      "/admin/users": "User Management",
      "/admin/experiences": "Experience Oversight",
      "/admin/projects": "Project Management",
      "/admin/reports": "Reports & Analytics",
      "/admin/settings": "Settings"
    };
    
    return paths[location.pathname] || "Dashboard";
  };

  const showDashboard = location.pathname === "/admin" || location.pathname === "/admin/dashboard";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <AdminNavigation userName={user?.name || ""} onLogout={handleLogout} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <AdminHeader pageTitle={getCurrentPageTitle()} />
          
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            {showDashboard ? <AdminDashboard /> : <Outlet />}
          </main>

          <AdminFooter />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default AdminLayout;
