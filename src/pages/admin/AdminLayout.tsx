
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminFooter } from "@/components/admin/layout/AdminFooter";
import { AdminNavigation } from "@/components/admin/layout/AdminNavigation";
import { useEffect } from "react";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to /admin/dashboard if on root /admin path
    if (location.pathname === '/admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
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
          <AdminHeader pageTitle="Dashboard" className="sticky top-0 z-10" />
          
          <div className="flex-1 overflow-y-auto">
            <main className="p-4 sm:p-6">
              <Outlet />
            </main>
          </div>

          <AdminFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
