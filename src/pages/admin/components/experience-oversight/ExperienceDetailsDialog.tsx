
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Experience } from "../../types/experience";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeColor } from "./ExperienceCard";

interface ExperienceDetailsDialogProps {
  experience: Experience;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: () => void;
}

export const ExperienceDetailsDialog = ({
  experience,
  open,
  onOpenChange,
  onStatusChange,
}: ExperienceDetailsDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = async (newStatus: Experience['approval_status']) => {
    if (!user?.id) return;
    
    try {
      setIsSubmitting(true);

      // Update experience status
      const { error: updateError } = await supabase
        .from('educator_experiences')
        .update({ approval_status: newStatus })
        .eq('id', experience.id);

      if (updateError) throw updateError;

      // Create status change record
      const { error: logError } = await supabase
        .from('experience_status_changes')
        .insert({
          experience_id: experience.id,
          admin_id: user.id,
          old_status: experience.approval_status,
          new_status: newStatus,
          feedback: feedback.trim() || null,
        });

      if (logError) throw logError;

      toast({
        title: "Status Updated",
        description: `Experience status has been updated to ${newStatus.replace('_', ' ')}.`,
      });

      onStatusChange();
      onOpenChange(false);
      setFeedback("");
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update experience status",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{experience.title}</DialogTitle>
            <Badge className={getStatusBadgeColor(experience.approval_status)}>
              {experience.approval_status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <DialogDescription>
            Submitted by {experience.educator.full_name} from {experience.educator.institution_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="text-sm text-muted-foreground">{experience.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1">Category</h3>
              <p className="text-sm">{experience.trade_category}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Submission Date</h3>
              <p className="text-sm">
                {format(new Date(experience.created_at), "PPp")}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Admin Feedback</h3>
            <Textarea
              placeholder="Provide feedback to the educator..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          {experience.approval_status === 'pending_review' && (
            <>
              <Button
                variant="destructive"
                onClick={() => handleStatusChange('rejected')}
                disabled={isSubmitting}
              >
                Reject
              </Button>
              <Button
                variant="default"
                className="bg-yellow-500 hover:bg-yellow-600"
                onClick={() => handleStatusChange('needs_modification')}
                disabled={isSubmitting}
              >
                Request Changes
              </Button>
              <Button
                onClick={() => handleStatusChange('approved')}
                disabled={isSubmitting}
              >
                Approve
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
