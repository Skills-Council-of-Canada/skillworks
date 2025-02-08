
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

interface Project {
  id: string;
  title: string;
  status: "active" | "draft" | "completed";
  applications: number;
}

interface ProjectListProps {
  status: "active" | "draft" | "completed";
}

export const ProjectList = ({ status }: ProjectListProps) => {
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const projects: Project[] = [
    {
      id: "1",
      title: "Electrical Maintenance Training",
      status: "active" as const,
      applications: 5,
    },
    {
      id: "2",
      title: "Plumbing Apprenticeship",
      status: "active" as const,
      applications: 3,
    },
  ].filter((project) => project.status === status);

  const handleView = (projectId: string) => {
    navigate(`/employer/projects/${projectId}`);
  };

  const handleEdit = (projectId: string) => {
    // Handle edit action
    console.log("Edit project:", projectId);
  };

  const handleClose = (projectId: string) => {
    // Handle close action
    console.log("Close project:", projectId);
  };

  const handleDelete = (projectId: string) => {
    // Handle delete action
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(project.status)} text-white`}
                >
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{project.applications}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(project.id)}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
