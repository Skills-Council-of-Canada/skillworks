import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Project } from "@/hooks/employer/projectTypes";
import { format } from "date-fns";
import { X } from "lucide-react";

interface ProjectDetailsDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailsDialog = ({ project, open, onOpenChange }: ProjectDetailsDialogProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{project.title}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{project.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Trade Type</h3>
              <p className="text-sm text-muted-foreground">{project.trade_type}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p className="text-sm text-muted-foreground capitalize">{project.status}</p>
            </div>
          </div>
          
          {(project.start_date || project.end_date) && (
            <div className="grid grid-cols-2 gap-4">
              {project.start_date && (
                <div>
                  <h3 className="font-semibold">Start Date</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(project.start_date), 'MMM d, yyyy')}
                  </p>
                </div>
              )}
              {project.end_date && (
                <div>
                  <h3 className="font-semibold">End Date</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(project.end_date), 'MMM d, yyyy')}
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            {project.location_type && (
              <div>
                <h3 className="font-semibold">Location Type</h3>
                <p className="text-sm text-muted-foreground">{project.location_type}</p>
              </div>
            )}
            {project.positions && (
              <div>
                <h3 className="font-semibold">Positions</h3>
                <p className="text-sm text-muted-foreground">{project.positions}</p>
              </div>
            )}
          </div>
          
          {project.site_address && (
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-sm text-muted-foreground">{project.site_address}</p>
            </div>
          )}
          
          {project.skill_level && (
            <div>
              <h3 className="font-semibold">Skill Level</h3>
              <p className="text-sm text-muted-foreground">{project.skill_level}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;
