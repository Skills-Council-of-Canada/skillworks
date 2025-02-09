
import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  end?: boolean;
}

export const NavItem = ({ to, icon: Icon, children, end }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex w-full items-center ${
          isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"
        } px-2 py-1.5 rounded-md transition-colors`
      }
    >
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </NavLink>
  );
};
