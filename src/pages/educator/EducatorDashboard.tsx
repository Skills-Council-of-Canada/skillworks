
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ClipboardList,
  GraduationCap,
  Plus,
  Briefcase,
  Users,
} from "lucide-react";
import { useEducatorDashboard } from "@/hooks/useEducatorDashboard";
import { format } from "date-fns";

const EducatorDashboard = () => {
  const navigate = useNavigate();
  const { tasks, events, experiences, isLoading } = useEducatorDashboard();

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
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button
          className="flex-1"
          onClick={() => navigate("/educator/experiences")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Experience
        </Button>
        <Button
          className="flex-1"
          onClick={() => navigate("/educator/projects")}
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Find Projects
        </Button>
        <Button
          className="flex-1"
          onClick={() => navigate("/educator/matches")}
        >
          <Users className="mr-2 h-4 w-4" />
          Assign Students
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Experiences</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : experiences?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : tasks?.filter(t => t.status === 'pending').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Available</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : events?.length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks and Events */}
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

      {/* Active Experiences */}
      <Card>
        <CardHeader>
          <CardTitle>Active Experiences</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading experiences...</p>
          ) : !experiences?.length ? (
            <p className="text-sm text-muted-foreground">No active experiences</p>
          ) : (
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{exp.title}</p>
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
    </div>
  );
};

export default EducatorDashboard;
