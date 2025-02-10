
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ExperiencesTabProps {
  experienceStats: any[] | null;
}

export const ExperiencesTab = ({ experienceStats }: ExperiencesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Active Experiences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {experienceStats?.[0]?.active_experiences || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {experienceStats?.[0]?.total_learners || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {experienceStats?.[0]?.avg_completion_rate || 0}%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
