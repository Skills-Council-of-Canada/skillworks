
import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { UserMenu } from "./components/UserMenu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProfileCompletion } from "@/hooks/participant/useProfileCompletion";

export const ParticipantLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { profile } = useProfileCompletion();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <Navigation userName={user?.name} isMobile={false} />
      </div>

      <div className="flex-1 flex flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white border-b">
          <div className="md:hidden">
            <Navigation userName={user?.name} isMobile={true} />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/participant/notifications")}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <UserMenu 
              onLogout={handleLogout} 
              userName={user?.name} 
              showNotifications={true}
              avatarUrl={profile?.avatar_url}
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-4 md:p-8">
          <Outlet />
        </ScrollArea>
      </div>
    </div>
  );
};
