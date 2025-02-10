
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/auth";

export interface DashboardStats {
  educators: number;
  employers: number;
  participants: number;
  pendingApprovals: number;
  activeExperiences: number;
  matchedProjects: number;
}

export const useAdminStats = (user: User | null) => {
  const { toast } = useToast();

  return useQuery<DashboardStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      const educatorsCount = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'educator');

      const employersCount = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'employer');

      const participantsCount = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'participant');

      const unverifiedCount = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('verified', false);

      const experiencesCount = await supabase
        .from('educator_experiences')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');

      const matchesCount = await supabase
        .from('experience_matches')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'matched');

      return {
        educators: educatorsCount.count || 0,
        employers: employersCount.count || 0,
        participants: participantsCount.count || 0,
        pendingApprovals: unverifiedCount.count || 0,
        activeExperiences: experiencesCount.count || 0,
        matchedProjects: matchesCount.count || 0
      };
    },
    enabled: !!user?.id,
    meta: {
      onSettled: (_, error) => {
        if (error) {
          console.error('Error loading stats:', error);
          toast({
            title: "Error",
            description: "Failed to load dashboard statistics",
            variant: "destructive",
          });
        }
      }
    }
  });
};
