
import { useTask } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Calendar, User, FileText } from "lucide-react";

interface TaskDetailsProps {
  taskId: string;
}

export const TaskDetails = ({ taskId }: TaskDetailsProps) => {
  const { task, isLoading } = useTask(taskId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'required':
        return 'bg-red-100 text-red-800';
      case 'recommended':
        return 'bg-blue-100 text-blue-800';
      case 'optional':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle>{task.title}</CardTitle>
          <div className="space-x-2">
            <Badge variant="secondary" className={getTypeColor(task.type)}>
              {task.type}
            </Badge>
            <Badge variant="default" className={getStatusColor(task.status)}>
              {task.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{task.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {task.due_date ? format(new Date(task.due_date), 'PPP') : 'No due date'}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Created: {format(new Date(task.created_at), 'PPP')}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <User className="mr-2 h-4 w-4" />
              Assigned by: {(task.assigned_by as any)?.name || 'Unknown'}
            </div>
            <div className="flex items-center text-sm">
              <User className="mr-2 h-4 w-4" />
              Assigned to: {(task.assigned_to as any)?.name || 'Unknown'}
            </div>
          </div>

          {task.submission_type && (
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <FileText className="mr-2 h-4 w-4" />
                Submission Type: {task.submission_type}
              </div>
              {task.submission_requirements && (
                <div className="text-sm text-muted-foreground">
                  Requirements: {JSON.stringify(task.submission_requirements)}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Edit Task</Button>
          <Button>Submit Task</Button>
        </div>
      </CardContent>
    </Card>
  );
};
