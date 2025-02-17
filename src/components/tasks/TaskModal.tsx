
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TaskBasicDetails } from "./form/TaskBasicDetails";
import { TaskTypeAndPriority } from "./form/TaskTypeAndPriority";
import { TaskDueDate } from "./form/TaskDueDate";
import { TaskSubmissionType } from "./form/TaskSubmissionType";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
}

interface TaskFormData {
  title: string;
  description: string;
  type: 'required' | 'recommended' | 'optional';
  priority: 'high' | 'medium' | 'low';
  due_date: Date | null;
  submission_type: 'text' | 'file' | 'link';
  assigned_to?: string;
}

export const TaskModal = ({ isOpen, onClose, taskId }: TaskModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    type: "required",
    priority: "medium",
    due_date: null,
    submission_type: "text"
  });

  const { data: task } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      if (!taskId) return null;
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!taskId
  });

  const createTaskMutation = useMutation({
    mutationFn: async (data: TaskFormData) => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data: result, error } = await supabase
        .from('tasks')
        .insert({
          title: data.title,
          description: data.description,
          type: data.type,
          priority: data.priority,
          due_date: data.due_date?.toISOString(),
          submission_type: data.submission_type,
          status: 'pending',
          created_by: user.id,
          assigned_by: user.id,
          assigned_to: data.assigned_to || user.id
        })
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Success",
        description: "Task created successfully",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (data: TaskFormData) => {
      const { data: result, error } = await supabase
        .from('tasks')
        .update({
          title: data.title,
          description: data.description,
          type: data.type,
          priority: data.priority,
          due_date: data.due_date?.toISOString(),
          submission_type: data.submission_type,
          assigned_to: data.assigned_to
        })
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskId) {
      updateTaskMutation.mutate(formData);
    } else {
      createTaskMutation.mutate(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{taskId ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TaskBasicDetails
            title={formData.title}
            description={formData.description}
            onChange={(field, value) => setFormData({ ...formData, [field]: value })}
          />

          <TaskTypeAndPriority
            type={formData.type}
            priority={formData.priority}
            onTypeChange={(value) => setFormData({ ...formData, type: value })}
            onPriorityChange={(value) => setFormData({ ...formData, priority: value })}
          />

          <TaskDueDate
            dueDate={formData.due_date}
            onChange={(date) => setFormData({ ...formData, due_date: date })}
          />

          <TaskSubmissionType
            submissionType={formData.submission_type}
            onChange={(value) => setFormData({ ...formData, submission_type: value })}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createTaskMutation.isPending || updateTaskMutation.isPending}
            >
              {taskId ? "Update Task" : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
