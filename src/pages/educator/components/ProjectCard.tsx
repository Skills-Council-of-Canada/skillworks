
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, School } from "lucide-react";
import { Project } from "../types/project";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  onViewProject?: (projectId: string) => void;
}

export const ProjectCard = ({ project, onViewProject }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    if (onViewProject) {
      onViewProject(project.id);
    } else {
      navigate(`/educator/projects/${project.id}`);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <Badge variant="secondary">{project.trade_type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {project.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <School className="h-4 w-4 text-muted-foreground" />
            <span>{project.skill_level}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {new Date(project.start_date).toLocaleDateString()} - 
              {new Date(project.end_date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{project.location_type}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleViewClick} className="w-full">View Project</Button>
      </CardFooter>
    </Card>
  );
};
