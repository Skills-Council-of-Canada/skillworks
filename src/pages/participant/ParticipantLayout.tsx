
import { Link, Outlet } from "react-router-dom";
import { LogOut, User, BookOpen, MessageSquare, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const ParticipantLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Participant Portal</h2>
          <p className="text-sm text-gray-400">Welcome, {user?.name}</p>
        </div>
        
        <nav className="space-y-2">
          <Link to="/participant">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/participant/learning">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <BookOpen className="mr-2 h-4 w-4" />
              Learning
            </Button>
          </Link>
          <Link to="/participant/messages">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </Link>
          <Link to="/participant/calendar">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </Link>
          <Link to="/participant/settings">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:text-white hover:bg-gray-800"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ParticipantLayout;
