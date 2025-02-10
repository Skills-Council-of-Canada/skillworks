
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { ProjectReviewStatus } from "../../ProjectManagement";

interface ActionButtonsProps {
  projectId: string;
  currentStatus: ProjectReviewStatus;
  onStatusChange: (projectId: string, newStatus: ProjectReviewStatus, feedback?: string) => Promise<void>;
}

export function ActionButtons({
  projectId,
  currentStatus,
  onStatusChange,
}: ActionButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleStatusChange = async () => {
    const newStatus = currentStatus === "approved" ? "rejected" : "approved";
    await onStatusChange(projectId, newStatus, feedback);
    setIsOpen(false);
    setFeedback("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          {currentStatus === "approved" ? (
            <X className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentStatus === "approved" ? "Reject Project" : "Approve Project"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {currentStatus === "approved"
                ? "Please provide a reason for rejecting this project."
                : "You can optionally provide feedback for the project approval."}
            </p>
            <Textarea
              placeholder="Enter your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusChange}>
              {currentStatus === "approved" ? "Reject" : "Approve"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
