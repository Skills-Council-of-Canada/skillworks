
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/hooks/employer/projectTypes";

interface ProjectSpecificationsCardProps {
  project?: Project;
  isLoading: boolean;
  formattedStartDate: string;
  formattedEndDate: string;
}

const ProjectSpecificationsCard = ({ 
  project, 
  isLoading,
  formattedStartDate,
  formattedEndDate
}: ProjectSpecificationsCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Start Date</h3>
              <p className="text-sm text-muted-foreground">
                {formattedStartDate}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">End Date</h3>
              <p className="text-sm text-muted-foreground">
                {formattedEndDate}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Location Type</h3>
              <p className="text-sm text-muted-foreground">
                {project?.location_type || 'Not specified'}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Positions</h3>
              <p className="text-sm text-muted-foreground">
                {project?.positions || 'Not specified'}
              </p>
            </div>
          </div>
          {project?.site_address && (
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-sm text-muted-foreground">
                {project.site_address}
              </p>
            </div>
          )}
          <div>
            <h3 className="font-semibold">Status</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {project?.status || 'Unknown'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSpecificationsCard;
