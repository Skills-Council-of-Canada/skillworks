
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit2, Check, X } from "lucide-react";

interface ReviewSectionCardProps {
  title: string;
  description: string;
  onEdit: () => void;
  isComplete: boolean;
  children: React.ReactNode;
}

const ReviewSectionCard = ({
  title,
  description,
  onEdit,
  isComplete,
  children,
}: ReviewSectionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              {children}
            </div>
            {isComplete ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <X className="h-5 w-5 text-destructive" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSectionCard;
