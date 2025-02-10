
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

  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      // Define a more specific type for the count query
      interface CountQueryResult {
        count: number | null;
        error: any;
      }

      const fetchCount = async (query: any): Promise<number> => {
        const { count, error } = await query as CountQueryResult;
        if (error) throw error;
        return count || 0;
      };

      const [
        educatorsCount,
        employersCount,
        participantsCount,
        unverifiedCount,
        experiencesCount,
        matchesCount
      ] = await Promise.all([
        fetchCount(supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'educator')),
        fetchCount(supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'employer')),
        fetchCount(supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'participant')),
        fetchCount(supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('verified', false)),
        fetchCount(supabase.from('educator_experiences').select('*', { count: 'exact', head: true }).eq('status', 'published')),
        fetchCount(supabase.from('experience_matches').select('*', { count: 'exact', head: true }).eq('status', 'matched'))
      ]);

      return {
        educators: educatorsCount,
        employers: employersCount,
        participants: participantsCount,
        pendingApprovals: unverifiedCount,
        activeExperiences: experiencesCount,
        matchedProjects: matchesCount
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
