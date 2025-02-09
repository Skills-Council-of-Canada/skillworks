
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SelectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export const SelectionCard = ({ icon: Icon, title, description, onClick }: SelectionCardProps) => {
  return (
    <Card className="relative hover:border-primary transition-colors cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        <Button className="w-full mt-4">Select</Button>
      </CardContent>
    </Card>
  );
};
