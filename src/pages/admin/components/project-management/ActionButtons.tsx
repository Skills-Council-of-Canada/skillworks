
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectReviewStatus } from "../../ProjectManagement";

interface ActionButtonsProps {
  projectId: string;
  currentStatus: ProjectReviewStatus;
  onStatusChange: (projectId: string, newStatus: ProjectReviewStatus) => Promise<void>;
}

export function ActionButtons({
  projectId,
  currentStatus,
  onStatusChange,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          onStatusChange(
            projectId,
            currentStatus === "approved" ? "rejected" : "approved"
          )
        }
      >
        {currentStatus === "approved" ? (
          <X className="h-4 w-4" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
