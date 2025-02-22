
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

const ParticipantLayout = () => {
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

  if (!user) {
    navigate("/login");
    return null;
  }

  const navItems = [
    { to: "/participant/dashboard", icon: Home, label: "Dashboard" },
    { to: "/participant/tasks", icon: CheckSquare, label: "Tasks & Activity" },
    { to: "/participant/experiences", icon: BookOpen, label: "My Experiences" },
    { to: "/participant/mentors", icon: Users, label: "My Mentors" },
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <Navigation userName={user?.name} navItems={navItems} />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen">
          <Header userName={user.name} onLogout={handleLogout} />
          <main className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ParticipantLayout;
