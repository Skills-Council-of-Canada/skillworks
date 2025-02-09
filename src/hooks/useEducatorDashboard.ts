
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EducatorTask, EducatorEvent, EducatorExperience } from "@/types/educator";

export const useEducatorDashboard = () => {
  const { data: tasks, isLoading: isLoadingTasks } = useQuery({
    queryKey: ["educatorTasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("educator_tasks")
        .select("*")
        .order("due_date", { ascending: true })
        .limit(5);

      if (error) throw error;
      return data as EducatorTask[];
    },
  });

  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["educatorEvents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("educator_events")
        .select("*")
        .gte("event_date", new Date().toISOString())
        .order("event_date", { ascending: true })
        .limit(5);

      if (error) throw error;
      return data as EducatorEvent[];
    },
  });

  const { data: experiences, isLoading: isLoadingExperiences } = useQuery({
    queryKey: ["educatorExperiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("educator_experiences")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as EducatorExperience[];
    },
  });

  return {
    tasks,
    events,
    experiences,
    isLoading: isLoadingTasks || isLoadingEvents || isLoadingExperiences,
  };
};
