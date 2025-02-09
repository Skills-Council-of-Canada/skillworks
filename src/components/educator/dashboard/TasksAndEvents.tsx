
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EducatorTask, EducatorEvent } from "@/types/educator";
import { format } from "date-fns";

interface TasksAndEventsProps {
  tasks?: EducatorTask[];
  events?: EducatorEvent[];
  isLoading: boolean;
}

export const TasksAndEvents = ({ tasks, events, isLoading }: TasksAndEventsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'active':
        return 'text-green-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Tasks & Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading tasks...</p>
          ) : !tasks?.length ? (
            <p className="text-sm text-muted-foreground">No pending tasks</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.due_date && `Due: ${format(new Date(task.due_date), 'PP')}`}
                    </p>
                  </div>
                  <span className={`text-sm ${getStatusColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading events...</p>
          ) : !events?.length ? (
            <p className="text-sm text-muted-foreground">No upcoming events</p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(event.event_date), 'PPp')}
                    </p>
                  </div>
                  <span className="text-sm capitalize">{event.type.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
