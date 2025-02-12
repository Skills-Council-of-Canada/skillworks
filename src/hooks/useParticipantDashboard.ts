
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

interface DashboardStats {
  activeExperiences: number;
  completedExperiences: number;
  upcomingEvents: number;
  unreadMessages: number;
}

type Activity = {
  id: string;
  title: string;
  description: string | null;
  activity_type: string;
  created_at: string;
}

type Event = Database['public']['Tables']['participant_events']['Row'];

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
      const { data: experiences } = await supabase
        .from("participant_experiences")
        .select("status");

      // Fetch unread messages count
      const { count: unreadCount } = await supabase
        .from("participant_messages")
        .select("*", { count: 'exact', head: true })
        .eq("participant_id", user.id)
        .eq("read", false);

      // Fetch recent activities (using notifications as activities)
      const { data: activities } = await supabase
        .from("notifications")
        .select("id, title, message:message as description, type:type as activity_type, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      // Fetch upcoming events
      const { data: events } = await supabase
        .from("participant_events")
        .select("*")
        .eq("participant_id", user.id)
        .gte("start_time", new Date().toISOString())
        .order("start_time", { ascending: true })
        .limit(5);

      // Calculate stats
      const stats: DashboardStats = {
        activeExperiences: experiences?.filter(e => e.status === "in_progress").length || 0,
        completedExperiences: experiences?.filter(e => e.status === "completed").length || 0,
        upcomingEvents: events?.length || 0,
        unreadMessages: unreadCount || 0,
      };

      return {
        stats,
        recentActivities: (activities || []) as Activity[],
        upcomingEvents: events || [],
      };
    }
  });
};
