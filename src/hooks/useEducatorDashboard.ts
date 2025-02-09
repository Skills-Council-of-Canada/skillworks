
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EducatorTask, EducatorEvent, EducatorExperience } from "@/types/educator";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export const useEducatorDashboard = () => {
  const { user } = useAuth();

  const { data: tasks, isLoading: isLoadingTasks } = useQuery({
    queryKey: ["educatorTasks", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log("No user ID available for tasks query");
        return [];
      }
      
      console.log("Fetching tasks for user:", user.id);
      const { data, error } = await supabase
        .from("educator_tasks")
        .select("*")
        .eq("educator_id", user.id)
        .order("due_date", { ascending: true })
        .limit(5);

      if (error) {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Error",
          description: "Failed to load tasks. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      
      console.log("Tasks fetched:", data);
      return data as EducatorTask[];
    },
    enabled: !!user?.id,
  });

  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["educatorEvents", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log("No user ID available for events query");
        return [];
      }

      console.log("Fetching events for user:", user.id);
      const { data, error } = await supabase
        .from("educator_events")
        .select("*")
        .eq("educator_id", user.id)
        .gte("event_date", new Date().toISOString())
        .order("event_date", { ascending: true })
        .limit(5);

      if (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Failed to load events. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      console.log("Events fetched:", data);
      return data as EducatorEvent[];
    },
    enabled: !!user?.id,
  });

  const { data: experiences, isLoading: isLoadingExperiences } = useQuery({
    queryKey: ["educatorExperiences", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        console.log("No user ID available for experiences query");
        return [];
      }

      console.log("Fetching experiences for user:", user.id);
      const { data, error } = await supabase
        .from("educator_experiences")
        .select("*")
        .eq("educator_id", user.id)
        .in("status", ['draft', 'pending_approval', 'published'])
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching experiences:", error);
        toast({
          title: "Error",
          description: "Failed to load experiences. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      console.log("Experiences fetched:", data);
      // Cast the response to the correct type after parsing screening_questions
      const experiences = data.map(exp => ({
        ...exp,
        screening_questions: exp.screening_questions?.map((q: any) => ({
          question: q.question || '',
          required: q.required || false
        })) || []
      })) as EducatorExperience[];

      return experiences;
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
