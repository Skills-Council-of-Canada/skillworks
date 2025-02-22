
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
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

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
  isMobile?: boolean;
}

export function ProjectsTable({ projects, isLoading, onStatusChange, isMobile }: ProjectsTableProps) {
  if (isMobile) {
    return (
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-4">Loading projects...</div>
        ) : projects?.length === 0 ? (
          <div className="text-center py-4">No projects found</div>
        ) : (
          projects?.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.employers?.company_name}
                    </p>
                  </div>
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p>Trade Type: {project.trade_type}</p>
                  <p>Created: {new Date(project.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-end">
                  <ActionButtons
                    projectId={project.id}
                    currentStatus={project.review_status}
                    onStatusChange={onStatusChange}
                  />
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    );
  }

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
