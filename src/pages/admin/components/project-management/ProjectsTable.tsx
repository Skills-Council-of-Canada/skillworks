
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectReviewStatus } from "../../types/project";
import { ActionButtons } from "./ActionButtons";

interface Project {
  id: string;
  title: string;
  employers?: {
    company_name: string;
  };
  trade_type: string;
  review_status: ProjectReviewStatus;
  created_at: string;
}

interface ProjectsTableProps {
  projects: Project[] | undefined;
  isLoading: boolean;
  onStatusChange: (projectId: string, newStatus: ProjectReviewStatus, feedback?: string) => Promise<void>;
}

export function ProjectsTable({ projects, isLoading, onStatusChange }: ProjectsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Trade Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Loading projects...
              </TableCell>
            </TableRow>
          ) : projects?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No projects found
              </TableCell>
            </TableRow>
          ) : (
            projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.employers?.company_name}</TableCell>
                <TableCell>{project.trade_type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.review_status === "approved"
                        ? "default"
                        : project.review_status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {project.review_status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(project.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <ActionButtons
                    projectId={project.id}
                    currentStatus={project.review_status}
                    onStatusChange={onStatusChange}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
