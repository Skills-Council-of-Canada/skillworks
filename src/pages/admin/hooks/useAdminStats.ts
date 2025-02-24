
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
            return 0; // Return 0 instead of throwing to prevent loops
          }
          
          return count || 0;
        } catch (error) {
          console.error(`Failed to fetch count for ${table}:`, error);
          return 0; // Return 0 instead of throwing to prevent loops
        }
      };

      try {
        // Show a single toast for all stats loading
        const showErrorToast = () => {
          toast({
            title: "Warning",
            description: "Some statistics failed to load",
            variant: "destructive",
          });
        };

        // Get all stats, defaulting to 0 on failure
        const stats: DashboardStats = {
          educators: await fetchCount('profiles', { role: 'educator' }),
          employers: await fetchCount('profiles', { role: 'employer' }),
          participants: await fetchCount('profiles', { role: 'participant' }),
          pendingApprovals: await fetchCount('profiles', { status: 'pending' }),
          activeExperiences: await fetchCount('educator_experiences', { status: 'published' }),
          matchedProjects: await fetchCount('experience_matches', { status: 'matched' })
        };

        // If any stat is 0, show the error toast
        if (Object.values(stats).some(value => value === 0)) {
          showErrorToast();
        }

        return stats;
      } catch (error) {
        console.error('Error in stats query:', error);
        // Return zeros instead of throwing
        return {
          educators: 0,
          employers: 0,
          participants: 0,
          pendingApprovals: 0,
          activeExperiences: 0,
          matchedProjects: 0
        };
      }
    },
    enabled: !!user?.id,
    staleTime: 30000, // Cache for 30 seconds
    retry: 1,
    meta: {
      onError: (error: any) => {
        console.error('Error loading stats:', error);
      }
    }
  });
};
