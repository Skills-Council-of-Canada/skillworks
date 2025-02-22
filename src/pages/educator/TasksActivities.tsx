
import { useQuery } from "@tanstack/react-query";
import { Clock, List, Plus, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

interface Task {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: string;
  status: string;
}

interface Activity {
  id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  experience_id: string | null;
  read: boolean;
  read_at: string | null;
  user_id: string;
}

const TasksActivities = () => {
  const isMobile = useIsMobile();
  
  const { data: tasks, isLoading: isLoadingTasks } = useQuery({
    queryKey: ['educator-tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('educator_tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Task[];
    }
  });

  const { data: activities, isLoading: isLoadingActivities } = useQuery({
    queryKey: ['educator-activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as Activity[];
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/50';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50';
      case 'low':
        return 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/50';
      default:
        return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-600 text-white dark:bg-green-500';
      case 'in_progress':
        return 'bg-blue-600 text-white dark:bg-blue-500';
      case 'pending':
        return 'bg-yellow-600 text-white dark:bg-yellow-500';
      default:
        return 'bg-gray-600 text-white dark:bg-gray-500';
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
            <Badge className={getStatusColor(task.status)}>
              {task.status}
            </Badge>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {task.due_date ? format(new Date(task.due_date), 'PP') : 'No due date'}
          </div>
          <Badge variant="secondary" className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Tasks & Activities</h1>
        <Button variant="default" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
          <TabsTrigger value="tasks" className="flex-1 text-gray-900 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Tasks</TabsTrigger>
          <TabsTrigger value="activities" className="flex-1 text-gray-900 dark:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Recent Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Current Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingTasks ? (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">Loading tasks...</div>
              ) : !tasks?.length ? (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                  No tasks found
                </div>
              ) : isMobile ? (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-900 dark:text-white">Title</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Due Date</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Priority</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="text-gray-900 dark:text-white font-medium">{task.title}</TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {task.due_date ? format(new Date(task.due_date), 'PP') : 'No due date'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingActivities ? (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">Loading activities...</div>
              ) : !activities?.length ? (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                  No recent activities
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    >
                      <div className="p-2 rounded-full bg-primary/10 text-primary dark:text-primary-foreground">
                        {activity.type === 'task' && <List className="h-4 w-4" />}
                        {activity.type === 'deadline' && <Clock className="h-4 w-4" />}
                        {activity.type === 'completion' && <CheckCircle2 className="h-4 w-4" />}
                        {activity.type === 'other' && <Calendar className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {format(new Date(activity.created_at), 'PPp')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TasksActivities;
