
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Project {
  id: string;
  title: string;
  status: "active" | "draft" | "completed";
  trade_type: string;
  description: string;
  start_date?: string;
  end_date?: string;
  location_type?: string;
  site_address?: string;
  positions?: number;
  skill_level?: string;
  applications_count?: number;
}

export function useProjects(status: "active" | "draft" | "completed") {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // Get the current user's ID
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        if (!userData.user) {
          throw new Error("No authenticated user found");
        }
        
        // Get the employer ID for the current user
        const { data: employerData, error: employerError } = await supabase
          .from('employers')
          .select('id')
          .eq('user_id', userData.user.id)
          .single();
        
        if (employerError) {
          throw employerError;
        }
        
        // Fetch projects based on employer ID and status
        let query = supabase
          .from('projects')
          .select(`
            id,
            title,
            status,
            trade_type,
            description,
            start_date,
            end_date,
            location_type,
            site_address,
            positions,
            skill_level,
            (SELECT count(*) FROM applications WHERE project_id = projects.id) as applications_count
          `)
          .eq('employer_id', employerData.id);
        
        // Filter by status
        if (status === 'draft') {
          query = query.eq('status', 'draft');
        } else if (status === 'active') {
          query = query.eq('status', 'pending').or('status.eq.approved');
        } else if (status === 'completed') {
          query = query.eq('status', 'completed');
        }
        
        const { data, error: projectsError } = await query;
        
        if (projectsError) {
          throw projectsError;
        }
        
        setProjects(data || []);
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        toast.error("Failed to load projects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [status]);

  return { projects, isLoading, error };
}
