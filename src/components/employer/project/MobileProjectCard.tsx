
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Eye, CheckCircle } from "lucide-react";
import { Project } from "@/hooks/employer/projectTypes";

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
  <Card className={`p-3 sm:p-4 mb-4 hover:bg-transparent`}>
    <div className="space-y-2 sm:space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-sm sm:text-base line-clamp-1">{project.title}</h3>
        <Badge
          variant="secondary"
          className={`${getStatusColor(project.status)} text-white text-xs whitespace-nowrap ml-2`}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
      </div>
      <div className="text-xs sm:text-sm text-gray-600">
        Trade Type: {project.trade_type}
      </div>
      <div className="text-xs sm:text-sm text-gray-600">
        Applications: {project.applications_count || 0}
      </div>
      <div className="flex justify-end gap-1 sm:gap-2 pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(project)}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(project.id)}
          disabled={project.status === "completed"}
          className="h-8 w-8 p-0"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        {project.status === "draft" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onApprove(project.id)}
            title="Activate Project"
            className="h-8 w-8 p-0"
          >
            <CheckCircle className="h-4 w-4 text-green-500" />
          </Button>
        )}
      </div>
    </div>
  </Card>
);
