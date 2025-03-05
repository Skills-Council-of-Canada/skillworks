
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Eye, Flag, Trash, CheckCircle } from "lucide-react";
import { Project } from "@/hooks/employer/useProjects";

interface MobileProjectCardProps {
  project: Project;
  onView: (project: Project) => void;
  onEdit: (projectId: string) => void;
  onClose: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  onApprove: (projectId: string) => void;
  getStatusColor: (status: string) => string;
}

export const MobileProjectCard = ({
  project,
  onView,
  onEdit,
  onClose,
  onDelete,
  onApprove,
  getStatusColor,
}: MobileProjectCardProps) => (
  <Card className="p-4 mb-4">
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{project.title}</h3>
        <Badge
          variant="secondary"
          className={`${getStatusColor(project.status)} text-white`}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
      </div>
      <div className="text-sm text-gray-600">
        Trade Type: {project.trade_type}
      </div>
      <div className="text-sm text-gray-600">
        Applications: {project.applications_count || 0}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(project)}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(project.id)}
          disabled={project.status === "completed"}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        {project.status === "draft" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onApprove(project.id)}
            title="Approve Project"
          >
            <CheckCircle className="h-4 w-4 text-green-500" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onClose(project.id)}
        >
          <Flag className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(project.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
);
