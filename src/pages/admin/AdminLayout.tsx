
import { Outlet, Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminFooter } from "@/components/admin/layout/AdminFooter";
import { AdminNavigation } from "@/components/admin/layout/AdminNavigation";
import { Toaster } from "@/components/ui/toaster";
import AdminDashboard from "./AdminDashboard";
import UserManagement from "./UserManagement";
import ExperienceOversight from "./ExperienceOversight";
import ProjectManagement from "./ProjectManagement";
import AdminMessages from "./AdminMessages";
import Reports from "./Reports";
import AdminSettings from "./AdminSettings";

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
      "/admin/messages": "Messages",
      "/admin/reports": "Reports & Analytics",
      "/admin/settings": "Settings"
    };
    
    return paths[location.pathname] || "Dashboard";
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r bg-[#1A1F2C]">
          <AdminNavigation onLogout={logout} userName={user?.name} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <AdminHeader pageTitle={getCurrentPageTitle()} />
          
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="experiences" element={<ExperienceOversight />} />
              <Route path="projects" element={<ProjectManagement />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Routes>
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
