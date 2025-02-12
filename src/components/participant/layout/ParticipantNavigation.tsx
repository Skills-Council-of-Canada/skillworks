
import React from 'react';
import { NavLink } from "react-router-dom";
import {
  Home,
  GraduationCap,
  MessageSquare,
  Settings,
  Calendar,
  BookOpen
} from "lucide-react";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const NavItem = ({ to, icon: Icon, children }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
          isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"
        }`
      }
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </NavLink>
  );
};

export const ParticipantNavigation = () => {
  return (
    <nav className="space-y-2 px-2">
      <NavItem to="/participant/dashboard" icon={Home}>
        Dashboard
      </NavItem>
      <NavItem to="/participant/experiences" icon={BookOpen}>
        My Experiences
      </NavItem>
      <NavItem to="/participant/learning" icon={GraduationCap}>
        Learning Path
      </NavItem>
      <NavItem to="/participant/messages" icon={MessageSquare}>
        Messages
      </NavItem>
      <NavItem to="/participant/calendar" icon={Calendar}>
        Calendar
      </NavItem>
      <NavItem to="/participant/settings" icon={Settings}>
        Settings
      </NavItem>
    </nav>
  );
};
