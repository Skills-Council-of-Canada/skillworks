
import { Outlet, useNavigate } from "react-router-dom";
import { 
  Home,
  CheckSquare,
  BookOpen, 
  Users,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";
import { useIsMobile } from "@/hooks/use-mobile";

const ParticipantLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { to: "/participant/dashboard", icon: Home, label: "Dashboard" },
    { to: "/participant/tasks", icon: CheckSquare, label: "Tasks & Activity" },
    { to: "/participant/experiences", icon: BookOpen, label: "My Experiences" },
    { to: "/participant/mentors", icon: Users, label: "My Mentors" },
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:block border-r bg-[#1A1F2C]" collapsible="icon">
          <Navigation userName={user?.name} navItems={navItems} isMobile={false} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <Header userName={user?.name} onLogout={handleLogout} />
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <Outlet />
          </main>

          {/* Mobile Navigation */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C] border-t border-white/10 z-50">
              <Navigation userName={user?.name} navItems={navItems} isMobile={true} />
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ParticipantLayout;
