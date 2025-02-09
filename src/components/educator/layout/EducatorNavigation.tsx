
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
  ClipboardList,
  Users,
  Building2
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
          <NavLink 
            to="/educator" 
            end
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/educator/experiences"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            My Experiences
          </NavLink>

          <NavLink 
            to="/educator/collaborations"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <Building2 className="mr-2 h-4 w-4" />
            Collaborations
          </NavLink>

          <NavLink 
            to="/educator/portals"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <Search className="mr-2 h-4 w-4" />
            Find a Portal
          </NavLink>

          <NavLink 
            to="/educator/projects"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Find a Project
          </NavLink>

          <NavLink 
            to="/educator/students"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <Users className="mr-2 h-4 w-4" />
            Students
          </NavLink>

          <NavLink 
            to="/educator/matches"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <UserCheck className="mr-2 h-4 w-4" />
            Match Requests
          </NavLink>

          <NavLink 
            to="/educator/tasks"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            Tasks & Activities
          </NavLink>

          <NavLink 
            to="/educator/messages"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </NavLink>

          <NavLink 
            to="/educator/calendar"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </NavLink>

          <NavLink 
            to="/educator/settings"
            className={({ isActive }) => 
              `flex w-full items-center ${isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/50'} px-2 py-1.5 rounded-md transition-colors`
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </NavLink>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center text-destructive hover:bg-destructive/10 px-2 py-1.5 rounded-md transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );
};
