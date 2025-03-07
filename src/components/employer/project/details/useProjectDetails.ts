
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Project } from "@/hooks/employer/projectTypes";

export const useProjectDetails = () => {
  const { projectId } = useParams();

  // Fetch project data with React Query for caching and better loading states
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
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
          status
        `)
        .eq('id', projectId)
        .single();
      
      if (error) throw error;
      return data as Project;
    },
    enabled: !!projectId,
  });

  // Fetch applications count with a separate query
  const { data: applicationsCount = 0, isLoading: isLoadingApplications } = useQuery({
    queryKey: ['projectApplications', projectId],
    queryFn: async () => {
      if (!projectId) return 0;
      
      const { count, error } = await supabase
        .from('applications')
        .select('id', { count: 'exact', head: true })
        .eq('project_id', projectId);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!projectId,
  });

  // Format dates if they exist
  const formattedStartDate = project?.start_date 
    ? format(new Date(project.start_date), 'MMM d, yyyy')
    : 'Not specified';
  
  const formattedEndDate = project?.end_date 
    ? format(new Date(project.end_date), 'MMM d, yyyy')
    : 'Not specified';

  return {
    project,
    isLoading,
    error,
    applicationsCount,
    isLoadingApplications,
    formattedStartDate,
    formattedEndDate
  };
};
