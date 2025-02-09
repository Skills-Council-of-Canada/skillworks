
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PortalCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  borderGradient: string;
  onSelect: (id: string) => void;
}

const PortalCard = ({
  id,
  title,
  description,
  icon: Icon,
  gradient,
  borderGradient,
  onSelect,
}: PortalCardProps) => {
  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-300 border-2 ${gradient} ${borderGradient} hover:shadow-lg`}
      onClick={() => onSelect(id)}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <Icon className="h-12 w-12 text-primary" />
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-secondary/60 mb-4">{description}</p>
        </div>
        <Button className="w-full group">
          Select Portal
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
};

export default PortalCard;
