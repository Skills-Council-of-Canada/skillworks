
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  UserCheck,
  Briefcase,
  ClipboardList
} from "lucide-react";

interface EducatorNavigationProps {
  onLogout: () => void;
}

export const EducatorNavigation = ({ onLogout }: EducatorNavigationProps) => {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-16 items-center border-b px-6">
        <NavLink to="/educator" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-6 w-6" />
          <span>Education Portal</span>
        </NavLink>
      </div>

      <div className="flex-1 px-4">
        <div className="space-y-1 py-2">
          <NavLink to="/educator" end>
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            )}
          </NavLink>
          
          <NavLink to="/educator/experiences">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                My Experiences
              </Button>
            )}
          </NavLink>

          <NavLink to="/educator/portals">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Search className="mr-2 h-4 w-4" />
                Find a Portal
              </Button>
            )}
          </NavLink>

          <NavLink to="/educator/projects">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Find a Project
              </Button>
            )}
          </NavLink>

          <NavLink to="/educator/matches">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Match Requests
              </Button>
            )}
          </NavLink>

          <NavLink to="/educator/tasks">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Tasks & Activities
              </Button>
            )}
          </NavLink>

          <NavLink to="/educator/messages">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            )}
          </NavLink>

          <NavLink to="/educator/calendar">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
            )}
          </NavLink>

          <NavLink to="/educator/settings">
            {({ isActive }) => (
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            )}
          </NavLink>
        </div>
      </div>

      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
};
