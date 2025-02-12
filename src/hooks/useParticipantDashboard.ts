
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  activeExperiences: number;
  completedExperiences: number;
  upcomingEvents: number;
  unreadMessages: number;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  activity_type: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  start_time: string;
  event_type: string;
}

interface DashboardData {
  stats: DashboardStats;
  recentActivities: Activity[];
  upcomingEvents: Event[];
}

export const useParticipantDashboard = () => {
  return useQuery({
    queryKey: ["participant-dashboard"],
    queryFn: async (): Promise<DashboardData> => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No user found");

      // Fetch experiences stats
      const { data: experiences, error: experiencesError } = await supabase
        .from("participant_experiences")
        .select("status")
        .eq("participant_id", user.id);

      if (experiencesError) throw experiencesError;

      // Fetch recent activities
      const { data: activities, error: activitiesError } = await supabase
        .from("participant_activities")
        .select("*")
        .eq("participant_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (activitiesError) throw activitiesError;

      // Fetch upcoming events
      const { data: events, error: eventsError } = await supabase
        .from("participant_events")
        .select("*")
        .eq("participant_id", user.id)
        .eq("status", "upcoming")
        .order("start_time", { ascending: true })
        .limit(5);

      if (eventsError) throw eventsError;

      // Calculate stats
      const stats: DashboardStats = {
        activeExperiences: experiences.filter(e => e.status === "in_progress").length,
        completedExperiences: experiences.filter(e => e.status === "completed").length,
        upcomingEvents: events.length,
        unreadMessages: 0, // This will be implemented with the messaging system
      };

      return {
        stats,
        recentActivities: activities,
        upcomingEvents: events,
      };
    }
  });
};
