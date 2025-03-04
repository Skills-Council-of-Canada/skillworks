
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Card className={cn("transition-all duration-200", isComplete ? "border-green-100" : "border-amber-100")}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="flex items-center hover:bg-slate-100"
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
              <Check className="h-5 w-5 text-green-500 shrink-0" />
            ) : (
              <X className="h-5 w-5 text-destructive shrink-0" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSectionCard;
