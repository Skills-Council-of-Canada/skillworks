
import { useTask } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Calendar, User, FileText, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface TaskDetailsProps {
  taskId: string;
  onClose: () => void;
}

export const TaskDetails = ({ taskId, onClose }: TaskDetailsProps) => {
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
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[540px]">
        <SheetHeader className="flex justify-between items-start">
          <SheetTitle className="text-xl font-bold">{task.title}</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="flex space-x-2">
            <Badge variant="secondary" className={getTypeColor(task.type)}>
              {task.type}
            </Badge>
            <Badge variant="default" className={getStatusColor(task.status)}>
              {task.status}
            </Badge>
          </div>

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
                <div className="flex items
-center text-sm">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
