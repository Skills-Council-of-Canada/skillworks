
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "../types/project";

interface Filters {
  locationType: string;
  projectType: string;
  industry: string;
}

export const useProjectSearch = (filters: Filters) => {
  return useQuery({
    queryKey: ["projects", filters],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select(`
          *,
          employer:employers(company_name, rating, rating_count)
        `)
        .eq("status", "published");

      if (filters.locationType) {
        query = query.eq("location_type", filters.locationType);
      }
      if (filters.projectType) {
        query = query.eq("project_type", filters.projectType);
      }
      if (filters.industry) {
        query = query.eq("industry", filters.industry);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as Project[];
    },
  });
};
