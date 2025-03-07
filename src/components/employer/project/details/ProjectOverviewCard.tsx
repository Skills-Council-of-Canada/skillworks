
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/hooks/employer/projectTypes";

interface ProjectOverviewCardProps {
  project?: Project;
  isLoading: boolean;
}

const ProjectOverviewCard = ({ project, isLoading }: ProjectOverviewCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground">
              {project?.description || 'No description provided'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Trade Type</h3>
              <p className="text-sm text-muted-foreground">
                {project?.trade_type || 'Not specified'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Skill Level</h3>
              <p className="text-sm text-muted-foreground">
                {project?.skill_level || 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverviewCard;
