
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
        `flex w-full items-center gap-2 ${
          isActive ? "bg-white/10" : "hover:bg-white/10"
        } px-2 py-1.5 rounded-md transition-colors`
      }
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </NavLink>
  );
};
