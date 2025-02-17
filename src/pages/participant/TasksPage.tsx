
import { useState } from "react";
import { useTasks, useTaskRealtime } from "@/hooks/useTasks";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskModal } from "@/components/tasks/TaskModal";
import { TaskDetails } from "@/components/tasks/TaskDetails";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

export default function TasksPage() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    priority: '',
    search: '',
    dueDate: undefined as Date | undefined,
  });

  const queryClient = useQueryClient();
  const { tasks, isLoading } = useTasks(filters);

  // Set up realtime updates
  useTaskRealtime(() => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  });

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <TaskFilters onFiltersChange={setFilters} />
        </div>

        <div className="col-span-9 space-y-4">
          {isLoading ? (
            <div>Loading tasks...</div>
          ) : !tasks?.length ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  No tasks found
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => handleTaskClick(task.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
                      <span>Due: {task.due_date ? format(new Date(task.due_date), 'PPP') : 'No due date'}</span>
                      <span>•</span>
                      <span>Assigned by: {(task.assigned_by as any)?.name}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedTaskId && (
        <TaskDetails
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}

      <TaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
