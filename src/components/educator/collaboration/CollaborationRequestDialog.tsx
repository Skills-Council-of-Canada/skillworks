
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Employer {
  id: string;
  company_name: string;
}

interface CollaborationRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedEmployer: Employer | null;
  message: string;
  onMessageChange: (message: string) => void;
  onSubmit: () => void;
}

export const CollaborationRequestDialog = ({
  open,
  onOpenChange,
  selectedEmployer,
  message,
  onMessageChange,
  onSubmit,
}: CollaborationRequestDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Collaboration</DialogTitle>
          <DialogDescription>
            Send a collaboration request to {selectedEmployer?.company_name}. Include a message explaining your interest and goals.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
