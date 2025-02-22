
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EducatorExperience } from "@/types/educator";
import { format } from "date-fns";

interface ActiveExperiencesProps {
  experiences?: EducatorExperience[];
  isLoading: boolean;
}

export const ActiveExperiences = ({ experiences, isLoading }: ActiveExperiencesProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-500';
      case 'pending_approval':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Experiences</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-foreground">Loading experiences...</p>
        ) : !experiences?.length ? (
          <p className="text-foreground">No active experiences</p>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{exp.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(exp.start_date), 'PP')} - 
                    {exp.end_date ? format(new Date(exp.end_date), 'PP') : 'Ongoing'}
                  </p>
                </div>
                <span className={`text-sm ${getStatusColor(exp.status)}`}>
                  {exp.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
