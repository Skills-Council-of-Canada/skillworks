
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useProfileCompletion } from './participant/useProfileCompletion';

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

type Event = {
  id: string;
  title: string;
  description: string;
  event_type: string;
  participant_id: string;
  start_time: string;
  created_at: string;
  updated_at: string;
}

type Recommendation = {
  id: string;
  participant_id: string;
  experience_id: string;
  match_score: number;
  status: string;
  created_at: string;
}

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
  const { user } = useAuth();
  const { completionPercentage } = useProfileCompletion();

  return useQuery({
    queryKey: ["participant-dashboard", user?.id],
    queryFn: async (): Promise<DashboardData> => {
      if (!user?.id) throw new Error('No user found');

      const [
        experiencesResult,
        tasksResult,
        unreadCountResult,
        recommendationsResult,
        notificationsResult,
        applicationsResult,
        eventsResult
      ] = await Promise.all([
        supabase.from("participant_experiences").select("status"),
        supabase.from("participant_tasks").select("*").eq("participant_id", user.id).order("due_date", { ascending: true }),
        supabase.from("participant_messages").select("*", { count: 'exact', head: true }).eq("participant_id", user.id).eq("read", false),
        supabase.from("participant_recommendations").select("*").eq("participant_id", user.id).eq("status", "active").limit(3),
        supabase.from("notifications").select("id, title, message, type, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("applications").select("id, created_at, status, project_id").eq("applicant_id", user.id).order("created_at", { ascending: false }),
        supabase.from("participant_events").select("*").eq("participant_id", user.id).gte("start_time", new Date().toISOString()).order("start_time", { ascending: true }).limit(5)
      ]);

      const [experiences, tasks, { count: unreadCount }, recommendations, notificationsData, applications, events] = [
        experiencesResult.data,
        tasksResult.data,
        unreadCountResult,
        recommendationsResult.data,
        notificationsResult.data,
        applicationsResult.data,
        eventsResult.data
      ];

      let applicationData = [];
      if (applications?.length) {
        const projectIds = applications.map(app => app.project_id);
        const { data: projects } = await supabase
          .from("projects")
          .select("id, title")
          .in("id", projectIds);

        applicationData = applications.map(app => ({
          id: app.id,
          title: projects?.find(p => p.id === app.project_id)?.title || 'Untitled Project',
          status: app.status,
          submitted_at: app.created_at
        }));
      }

      const activities = (notificationsData || []).map(notification => ({
        id: notification.id,
        title: notification.title,
        description: notification.message,
        activity_type: notification.type,
        created_at: notification.created_at
      }));

      const stats: DashboardStats = {
        activeExperiences: experiences?.filter(e => e.status === "in_progress").length || 0,
        completedExperiences: experiences?.filter(e => e.status === "completed").length || 0,
        upcomingEvents: events?.length || 0,
        unreadMessages: unreadCount || 0,
        pendingTasks: tasks?.filter(t => t.status !== "completed").length || 0,
        profileCompletion: completionPercentage
      };

      return {
        stats,
        recentActivities: activities,
        upcomingEvents: events || [],
        tasks: tasks || [],
        recommendations: recommendations || [],
        pendingApplications: applicationData
      };
    },
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,  // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000,    // Keep unused data for 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    retry: 1
  });
};
