
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EducatorTask, EducatorEvent, EducatorExperience } from "@/types/educator";
import { useAuth } from "@/contexts/AuthContext";

export const useEducatorDashboard = () => {
  const { user } = useAuth();

  const { data: tasks, isLoading: isLoadingTasks } = useQuery({
    queryKey: ["educatorTasks", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("educator_tasks")
        .select("*")
        .eq("educator_id", user.id)
        .order("due_date", { ascending: true })
        .limit(5);

      if (error) throw error;
      return data as EducatorTask[];
    },
    enabled: !!user?.id,
  });

  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["educatorEvents", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("educator_events")
        .select("*")
        .eq("educator_id", user.id)
        .gte("event_date", new Date().toISOString())
        .order("event_date", { ascending: true })
        .limit(5);

      if (error) throw error;
      return data as EducatorEvent[];
    },
    enabled: !!user?.id,
  });

  const { data: experiences, isLoading: isLoadingExperiences } = useQuery({
    queryKey: ["educatorExperiences", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("educator_experiences")
        .select("*")
        .eq("educator_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as EducatorExperience[];
    },
    enabled: !!user?.id,
  });

  return {
    tasks,
    events,
    experiences,
    isLoading: isLoadingTasks || isLoadingEvents || isLoadingExperiences,
  };
};
