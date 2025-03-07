
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ApplicationsTabContentProps {
  applicationsCount: number;
  isLoading: boolean;
}

const ApplicationsTabContent = ({ 
  applicationsCount, 
  isLoading 
}: ApplicationsTabContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-4 w-1/2" />
        ) : (
          <p className="text-muted-foreground">
            {applicationsCount} application{applicationsCount !== 1 ? 's' : ''} received
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationsTabContent;
