
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Hammer, Wrench } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PortalCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  borderGradient: string;
  onSelect: (id: string) => void;
  registrationPath: string;
}

const PortalCard = ({
  id,
  title,
  description,
  icon: Icon,
  onSelect,
}: PortalCardProps) => {
  return (
    <Card 
      className="p-6 bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 -mb-24"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <Icon className="h-12 w-12 text-primary" />
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        <div className="w-full">
          <Button 
            className="w-full group" 
            onClick={() => onSelect(id)}
          >
            Select Portal
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PortalCard;
