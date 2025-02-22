
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminFooter } from "@/components/admin/layout/AdminFooter";
import { AdminNavigation } from "@/components/admin/layout/AdminNavigation";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r fixed h-screen">
          <AdminNavigation userName={user?.name || ""} onLogout={handleLogout} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen pl-[240px]">
          <AdminHeader pageTitle="Dashboard" className="fixed top-0 right-0 left-[240px] z-10" />
          
          <div className="flex-1 overflow-auto mt-16">
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
