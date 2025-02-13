
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  gradient,
  borderGradient,
  onSelect,
  registrationPath,
}: PortalCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className={`p-6 transition-all duration-300 border-2 ${gradient} ${borderGradient} hover:shadow-lg`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <Icon className="h-12 w-12 text-primary" />
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-secondary/60 mb-4">{description}</p>
        </div>
        <div className="space-y-2 w-full">
          <Button 
            className="w-full group" 
            onClick={() => onSelect(id)}
          >
            Select Portal
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate(registrationPath)}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PortalCard;
