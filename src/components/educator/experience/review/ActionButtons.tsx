
import { Button } from "@/components/ui/button";
import { Save, Upload, Globe } from "lucide-react";
import { ExperienceFormValues } from "@/types/educator";
import { useExperienceSubmission } from "@/hooks/useExperienceSubmission";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ActionButtonsProps {
  values: ExperienceFormValues;
  isComplete: boolean;
}

const ActionButtons = ({ values, isComplete }: ActionButtonsProps) => {
  const { submitExperience, isSubmitting } = useExperienceSubmission();
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [visibility, setVisibility] = useState<'private' | 'public' | 'invite_only'>('private');
  const { toast } = useToast();

  const handleSaveDraft = async () => {
    await submitExperience(values, 'draft');
  };

  const handlePublish = async () => {
    if (!isComplete) return;
    
    try {
      const { data: experience, error: submitError } = await supabase
        .from('educator_experiences')
        .insert({
          ...values,
          status: 'pending_approval',
          marketplace_visibility: visibility,
          is_published: true
        })
        .select()
        .single();

      if (submitError) throw submitError;

      toast({
        title: "Experience Published",
        description: "Your experience has been published successfully.",
      });
      
      setIsPublishDialogOpen(false);
    } catch (error: any) {
      console.error('Error publishing experience:', error);
      toast({
        title: "Error",
        description: "Failed to publish experience. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-end space-x-4">
      <Button
        variant="outline"
        onClick={handleSaveDraft}
        disabled={isSubmitting}
        className="flex items-center"
      >
        <Save className="w-4 h-4 mr-2" />
        Save as Draft
      </Button>

      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogTrigger asChild>
          <Button
            disabled={!isComplete || isSubmitting}
            className="bg-primary hover:bg-primary/90 flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Publish Experience
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Experience</DialogTitle>
            <DialogDescription>
              Choose how your experience will be visible in the marketplace.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Visibility Settings</Label>
              <Select
                value={visibility}
                onValueChange={(value: 'private' | 'public' | 'invite_only') => setVisibility(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Private - Only visible to you
                    </div>
                  </SelectItem>
                  <SelectItem value="public">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Public - Visible to all users
                    </div>
                  </SelectItem>
                  <SelectItem value="invite_only">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Invite Only - Only visible to invited users
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish} disabled={isSubmitting}>
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
