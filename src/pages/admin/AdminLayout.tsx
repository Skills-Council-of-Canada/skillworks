
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminFooter } from "@/components/admin/layout/AdminFooter";
import { AdminNavigation } from "@/components/admin/layout/AdminNavigation";
import { useEffect } from "react";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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

  // Get current page title from the path
  const getCurrentPageTitle = () => {
    const path = location.pathname.split('/').pop() || '';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        {/* Desktop Sidebar */}
        <Sidebar collapsible="icon" className="hidden md:flex border-r">
          <AdminNavigation userName={user?.name || ""} onLogout={handleLogout} isMobile={false} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <AdminHeader 
            pageTitle={getCurrentPageTitle()}
            className="sticky top-0 z-10"
          />
          
          <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
            <main className="p-4 sm:p-6">
              <Outlet />
            </main>
          </div>

          <AdminFooter />

          {/* Mobile navigation bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C] border-t border-white/10 md:hidden">
            <AdminNavigation userName={user?.name || ""} onLogout={handleLogout} isMobile={true} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
