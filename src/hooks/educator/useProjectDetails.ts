
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  trade_type: string;
  skill_level: string;
  start_date: string;
  end_date: string;
  location_type: string;
  site_address?: string;
  positions: number;
  status: string;
  certifications_required?: string[];
  safety_requirements?: string[];
  employer_id: string;
}

export const useProjectDetails = (projectId?: string) => {
  return useQuery({
    queryKey: ['educator-project-details', projectId],
    queryFn: async (): Promise<ProjectDetails> => {
      if (!projectId) throw new Error("Project ID is required");
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          description,
          trade_type,
          skill_level,
          start_date,
          end_date,
          location_type,
          site_address,
          positions,
          status,
          certifications_required,
          safety_requirements,
          employer_id
        `)
        .eq('id', projectId)
        .single();
      
      if (error) {
        console.error('Error fetching project details:', error);
        toast.error('Failed to load project details');
        throw error;
      }
      
      return data as ProjectDetails;
    },
    enabled: !!projectId,
  });
};
