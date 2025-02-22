
import {
  Calendar,
  GraduationCap,
  Home,
  Search,
  Settings,
  UserCheck,
  Briefcase,
  ClipboardList,
  Users,
  Building2,
  MessageSquare
} from "lucide-react";
import { NavigationHeader } from "./NavigationHeader";
import { NavItem } from "./NavItem";
import { LogoutButton } from "./LogoutButton";

interface EducatorNavigationProps {
  onLogout: () => void;
  userName: string;
}

export const EducatorNavigation = ({ onLogout, userName }: EducatorNavigationProps) => {
  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "there";
  };

  return (
    <div className="flex h-full flex-col gap-2 bg-[#1A1F2C]">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold mb-1 text-white">Education Portal</h2>
        <p className="text-sm text-gray-400">Welcome back, {getFirstName(userName)}</p>
      </div>

      <div className="flex-1 px-4">
        <div className="space-y-1 py-2">
          <NavItem to="/educator" icon={Home} end>
            Dashboard
          </NavItem>
          
          <NavItem to="/educator/experiences" icon={GraduationCap}>
            My Experiences
          </NavItem>

          <NavItem to="/educator/collaborations" icon={Building2}>
            Collaborations
          </NavItem>

          <NavItem to="/educator/portals" icon={Search}>
            Find a Portal
          </NavItem>

          <NavItem to="/educator/projects" icon={Briefcase}>
            Find a Project
          </NavItem>

          <NavItem to="/educator/students" icon={Users}>
            Students
          </NavItem>

          <NavItem to="/educator/matches" icon={UserCheck}>
            Match Requests
          </NavItem>

          <NavItem to="/educator/tasks" icon={ClipboardList}>
            Tasks & Activities
          </NavItem>

          <NavItem to="/educator/messages" icon={MessageSquare}>
            Messages
          </NavItem>

          <NavItem to="/educator/calendar" icon={Calendar}>
            Calendar
          </NavItem>

          <NavItem to="/educator/settings" icon={Settings}>
            Settings
          </NavItem>
        </div>
      </div>

      <LogoutButton onLogout={onLogout} />
    </div>
  );
};
