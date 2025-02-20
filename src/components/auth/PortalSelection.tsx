
import { Building2, GraduationCap, UserCircle } from "lucide-react";
import { UserRole } from "@/types/auth";
import PortalCard from "./PortalCard";

export const portals = [
  {
    id: "employer",
    title: "Employer Portal",
    description: "Post projects and find skilled workers",
    role: "employer" as UserRole,
    icon: Building2,
    gradient: "bg-gradient-to-br from-blue-500/10 to-purple-500/10",
    borderGradient: "hover:border-blue-500/50",
    registrationPath: "/employer/registration"
  },
  {
    id: "educator",
    title: "Educator Portal",
    description: "Manage training programs and track student progress",
    role: "educator" as UserRole,
    icon: GraduationCap,
    gradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
    borderGradient: "hover:border-green-500/50",
    registrationPath: "/educator/registration"
  },
  {
    id: "participant",
    title: "Participant Portal",
    description: "Find opportunities and track your learning journey",
    role: "participant" as UserRole,
    icon: UserCircle,
    gradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
    borderGradient: "hover:border-orange-500/50",
    registrationPath: "/participant/registration"
  },
];

interface PortalSelectionProps {
  onPortalSelect: (portalId: string, role: UserRole) => void;
}

const PortalSelection = ({ onPortalSelect }: PortalSelectionProps) => {
  return (
    <div className="w-full max-w-4xl space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-secondary mb-2">Real-World Experience. Real Opportunities. Real Impact.</h2>
        <p className="text-secondary/60 mb-8 text-lg">Choose your portal to continue</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {portals.map((portal) => (
          <PortalCard
            key={portal.id}
            {...portal}
            onSelect={() => onPortalSelect(portal.id, portal.role)}
            registrationPath={portal.registrationPath}
          />
        ))}
      </div>
    </div>
  );
};

export default PortalSelection;
