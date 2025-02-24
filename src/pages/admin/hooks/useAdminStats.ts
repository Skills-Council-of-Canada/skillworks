
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

// Define the tables we'll be querying
type QueryableTables = "profiles" | "educator_experiences" | "experience_matches";

export const useAdminStats = (user: User | null) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["admin-stats", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      const fetchCount = async (
        table: QueryableTables,
        condition: Record<string, any> = {}
      ): Promise<number> => {
        try {
          const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true })
            .match(condition);
            
          if (error) {
            console.error(`Error fetching count for ${table}:`, error);
            return 0;
          }
          
          return count || 0;
        } catch (error) {
          console.error(`Failed to fetch count for ${table}:`, error);
          return 0;
        }
      };

      const stats: DashboardStats = {
        educators: await fetchCount('profiles', { role: 'educator' }),
        employers: await fetchCount('profiles', { role: 'employer' }),
        participants: await fetchCount('profiles', { role: 'participant' }),
        pendingApprovals: await fetchCount('profiles', { status: 'pending' }),
        activeExperiences: await fetchCount('educator_experiences', { status: 'published' }),
        matchedProjects: await fetchCount('experience_matches', { status: 'matched' })
      };

      return stats;
    },
    enabled: !!user?.id,
    staleTime: 30000,
    retry: 1,
    meta: {
      onError: (error: any) => {
        console.error('Error loading stats:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        });
      }
    }
  });
};
