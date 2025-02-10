
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

      const queries = [
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'educator'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'employer'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'participant'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('verified', false),
        supabase.from('educator_experiences').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('experience_matches').select('*', { count: 'exact', head: true }).eq('status', 'matched')
      ];

      const [
        educatorsCount,
        employersCount,
        participantsCount,
        unverifiedCount,
        experiencesCount,
        matchesCount
      ] = await Promise.all(queries);

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
