
import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export const NavigationHeader = () => {
  return (
    <div className="flex h-16 items-center border-b border-white/10 px-6">
      <NavLink to="/educator" className="flex items-center gap-2 font-semibold text-white">
        <GraduationCap className="h-6 w-6" />
        <span>Education Portal</span>
      </NavLink>
    </div>
  );
};
