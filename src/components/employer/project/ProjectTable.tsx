
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, Flag, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/hooks/employer/useProjects";

interface ProjectTableProps {
  projects: Project[];
  isLoading: boolean;
  status: "active" | "draft" | "completed";
  onView: (project: Project) => void;
  onEdit: (projectId: string) => void;
  onClose: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  getStatusColor: (status: string) => string;
}

export const ProjectTable = ({
  projects,
  isLoading,
  status,
  onView,
  onEdit,
  onClose,
  onDelete,
  getStatusColor,
}: ProjectTableProps) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Title</TableHead>
            <TableHead>Trade Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Loading projects...
              </TableCell>
            </TableRow>
          ) : projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No projects found
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.trade_type}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${getStatusColor(project.status)} text-white`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{project.applications_count || 0}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(project)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(project.id)}
                      disabled={status === "completed"}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onClose(project.id)}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(project.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
