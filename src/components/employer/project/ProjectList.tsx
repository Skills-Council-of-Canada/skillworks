
import { useNavigate } from "react-router-dom";
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
import { Card } from "@/components/ui/card";
import { useProjects } from "@/hooks/employer/useProjects";
import { useState } from "react";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import { toast } from "sonner";

interface ProjectListProps {
  status: "active" | "draft" | "completed";
}

export const ProjectList = ({ status }: ProjectListProps) => {
  const navigate = useNavigate();
  const { projects, isLoading } = useProjects(status);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleView = (project: any) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleEdit = (projectId: string) => {
    navigate(`/employer/projects/edit/${projectId}`);
  };

  const handleClose = (projectId: string) => {
    // Handle close action
    toast.info("This feature is coming soon!");
    console.log("Close project:", projectId);
  };

  const handleDelete = (projectId: string) => {
    // Handle delete action
    toast.info("This feature is coming soon!");
    console.log("Delete project:", projectId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "draft":
        return "bg-yellow-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  // Mobile card view
  const MobileProjectCard = ({ project }: { project: any }) => (
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
            onClick={() => handleView(project)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(project.id)}
            disabled={status === "completed"}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleClose(project.id)}
          >
            <Flag className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(project.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  // Show mobile cards on small screens
  if (typeof window !== 'undefined' && window.innerWidth < 640) {
    return (
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center text-gray-500 py-4">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No projects found</p>
        ) : (
          projects.map((project) => (
            <MobileProjectCard key={project.id} project={project} />
          ))
        )}
        <ProjectDetailsDialog 
          project={selectedProject}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      </div>
    );
  }

  // Desktop table view
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
                      onClick={() => handleView(project)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(project.id)}
                      disabled={status === "completed"}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleClose(project.id)}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(project.id)}
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
      <ProjectDetailsDialog 
        project={selectedProject}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
};
