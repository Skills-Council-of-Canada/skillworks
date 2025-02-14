
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

interface DashboardStats {
  activeExperiences: number;
  completedExperiences: number;
  upcomingEvents: number;
  unreadMessages: number;
  pendingTasks: number;
  profileCompletion: number;
}

type Activity = {
  id: string;
  title: string;
  description: string | null;
  activity_type: string;
  created_at: string;
}

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  priority: string;
}

type Event = Database['public']['Tables']['participant_events']['Row'];
type Recommendation = Database['public']['Tables']['participant_recommendations']['Row'];

interface DashboardData {
  stats: DashboardStats;
  recentActivities: Activity[];
  upcomingEvents: Event[];
  tasks: Task[];
  recommendations: Recommendation[];
  pendingApplications: {
    id: string;
    title: string;
    status: string;
    submitted_at: string;
  }[];
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

      // Fetch tasks
      const { data: tasks } = await supabase
        .from("participant_tasks")
        .select("*")
        .eq("participant_id", user.id)
        .order("due_date", { ascending: true });

      // Fetch unread messages count
      const { count: unreadCount } = await supabase
        .from("participant_messages")
        .select("*", { count: 'exact', head: true })
        .eq("participant_id", user.id)
        .eq("read", false);

      // Fetch recommendations
      const { data: recommendations } = await supabase
        .from("participant_recommendations")
        .select("*")
        .eq("participant_id", user.id)
        .eq("status", "active")
        .limit(3);

      // Fetch recent activities
      const { data: notificationsData } = await supabase
        .from("notifications")
        .select("id, title, message, type, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      // Fetch pending applications
      const { data: applications } = await supabase
        .from("applications")
        .select(`
          id,
          created_at,
          status,
          project:projects(title)
        `)
        .eq("applicant_id", user.id)
        .order("created_at", { ascending: false });

      // Transform notifications into activities
      const activities: Activity[] = (notificationsData || []).map(notification => ({
        id: notification.id,
        title: notification.title,
        description: notification.message,
        activity_type: notification.type,
        created_at: notification.created_at
      }));

      // Fetch upcoming events
      const { data: events } = await supabase
        .from("participant_events")
        .select("*")
        .eq("participant_id", user.id)
        .gte("start_time", new Date().toISOString())
        .order("start_time", { ascending: true })
        .limit(5);

      // Calculate profile completion
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const profileFields = ['name', 'avatar_url', 'bio', 'phone', 'preferred_contact'];
      const completedFields = profileFields.filter(field => profile && profile[field]);
      const profileCompletion = Math.round((completedFields.length / profileFields.length) * 100);

      // Calculate stats
      const stats: DashboardStats = {
        activeExperiences: experiences?.filter(e => e.status === "in_progress").length || 0,
        completedExperiences: experiences?.filter(e => e.status === "completed").length || 0,
        upcomingEvents: events?.length || 0,
        unreadMessages: unreadCount || 0,
        pendingTasks: tasks?.filter(t => t.status !== "completed").length || 0,
        profileCompletion
      };

      return {
        stats,
        recentActivities: activities,
        upcomingEvents: events || [],
        tasks: tasks || [],
        recommendations: recommendations || [],
        pendingApplications: applications?.map(app => ({
          id: app.id,
          title: app.project?.title || 'Untitled Project',
          status: app.status,
          submitted_at: app.created_at
        })) || []
      };
    }
  });
};
