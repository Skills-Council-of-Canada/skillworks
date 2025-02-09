
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
  onViewProject: (projectId: string) => void;
}

export const ProjectCard = ({ project, onViewProject }: ProjectCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm">
              {project.employer.rating?.toFixed(1) || "N/A"}
            </span>
            <span className="text-sm text-muted-foreground">
              ({project.employer.rating_count})
            </span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {project.employer.company_name}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{project.trade_type}</Badge>
          <Badge variant="outline">{project.location_type}</Badge>
          <Badge variant="outline">{project.project_type}</Badge>
        </div>
        <Button className="w-full" onClick={() => onViewProject(project.id)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
