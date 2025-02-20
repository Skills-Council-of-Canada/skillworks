
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
      style={{
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23F1F0FB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9'/%3E%3Cpath d='M17.64 15 22 10.64'/%3E%3Cpath d='m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23F1F0FB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3 0 2.12 2.12 0 0 1 0-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'/%3E%3C/svg%3E")
        `,
        backgroundSize: '48px 48px, 48px 48px',
        backgroundPosition: '0 0, 24px 24px',
        backgroundRepeat: 'repeat',
        backgroundBlendMode: 'multiply'
      }}
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
