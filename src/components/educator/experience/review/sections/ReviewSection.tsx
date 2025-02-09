
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}

const ReviewSection = ({ title, children, onEdit }: ReviewSectionProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="flex items-center text-muted-foreground hover:text-primary"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
      <Separator className="mb-4" />
      {children}
    </Card>
  );
};

export default ReviewSection;
