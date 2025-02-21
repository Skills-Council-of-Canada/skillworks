
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const QuickActionCard = ({ title, description, icon: Icon, onClick }: QuickActionCardProps) => {
  return (
    <Card 
      className="hover:bg-[#0EA5E9] cursor-pointer transition-colors group" 
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium leading-none group-hover:text-white">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-white" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 group-hover:text-white">{description}</p>
      </CardContent>
    </Card>
  );
};
