
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TasksActivities = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tasks & Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Organize and manage your educational workflows.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksActivities;
