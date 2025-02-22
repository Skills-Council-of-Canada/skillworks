
import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  end?: boolean;
}

export const NavItem = ({ to, icon: Icon, children, end }: NavItemProps) => {
  const { state } = useSidebar();
  
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex w-full items-center ${state === "collapsed" ? "justify-center" : ""} text-gray-300 ${
          isActive ? "bg-white/10" : "hover:bg-white/10"
        } px-2 py-1.5 rounded-md transition-colors`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className={state === "collapsed" ? "hidden" : "block truncate ml-2"}>
        {children}
      </span>
    </NavLink>
  );
};
