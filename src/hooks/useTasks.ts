
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'required' | 'recommended' | 'optional';
  status: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  due_date: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
  assigned_by: string;
  assigned_to: string;
  submission_type: 'text' | 'file' | 'link';
  submission_requirements?: Record<string, any>;
}

export const useTasks = (filters?: {
  status?: string;
  type?: string;
  priority?: string;
  dueDate?: Date;
  search?: string;
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      let query = supabase
        .from('tasks')
        .select(`
          *,
          assigned_by:profiles!tasks_assigned_by_fkey(id, name),
          assigned_to:profiles!tasks_assigned_to_fkey(id, name)
        `);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters?.dueDate) {
        query = query.eq('due_date', filters.dueDate.toISOString());
      }
      if (filters?.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  return { tasks: data, isLoading, error };
};

export const useTask = (taskId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      if (!taskId) return null;
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assigned_by:profiles!tasks_assigned_by_fkey(id, name),
          assigned_to:profiles!tasks_assigned_to_fkey(id, name)
        `)
        .eq('id', taskId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!taskId
  });

  return { task: data, isLoading };
};

export const useTaskSubmissions = (taskId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['task-submissions', taskId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('task_submissions')
        .select('*')
        .eq('task_id', taskId);

      if (error) throw error;
      return data;
    }
  });

  return { submissions: data, isLoading };
};

export const useTaskRealtime = (onUpdate: () => void) => {
  useEffect(() => {
    const channel = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        onUpdate
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onUpdate]);
};
