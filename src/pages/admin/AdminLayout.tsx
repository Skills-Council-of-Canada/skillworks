
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminFooter } from "@/components/admin/layout/AdminFooter";
import { AdminNavigation } from "@/components/admin/layout/AdminNavigation";

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <AdminNavigation userName={user?.name || ""} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <AdminHeader pageTitle="Dashboard" />
          
          <div className="flex-1 overflow-auto">
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
