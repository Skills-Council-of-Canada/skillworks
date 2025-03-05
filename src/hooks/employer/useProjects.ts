
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
    fetchProjects();
  }, [status]);

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
      const { data: projectsData, error: projectsError } = await supabase
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
          skill_level
        `)
        .eq('employer_id', employerData.id);
      
      if (projectsError) {
        throw projectsError;
      }

      // Get the application counts for each project
      const projectIds = projectsData.map(project => project.id);
      
      // If there are no projects, just return an empty array
      if (projectIds.length === 0) {
        setProjects([]);
        setIsLoading(false);
        return;
      }
      
      // Fix: Use a different approach to get application counts
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('project_id')
        .in('project_id', projectIds)
        .or('status.eq.pending,status.eq.approved');
      
      if (applicationsError) {
        console.error('Error fetching applications:', applicationsError);
      }
      
      // Manually count applications per project
      const applicationCounts: { [key: string]: number } = {};
      
      if (applicationsData) {
        applicationsData.forEach((app: any) => {
          if (app.project_id) {
            applicationCounts[app.project_id] = (applicationCounts[app.project_id] || 0) + 1;
          }
        });
      }
      
      // Filter projects based on status and map database status to our expected status type
      const filteredProjects = projectsData
        .filter(project => {
          if (status === 'draft') {
            return project.status === 'draft';
          } else if (status === 'active') {
            return project.status === 'pending' || project.status === 'approved';
          } else if (status === 'completed') {
            return project.status === 'completed';
          }
          return false;
        })
        .map(project => {
          // Map database status to our Project interface status
          let mappedStatus: "active" | "draft" | "completed";
          if (project.status === 'draft') {
            mappedStatus = 'draft';
          } else if (project.status === 'pending' || project.status === 'approved') {
            mappedStatus = 'active';
          } else if (project.status === 'completed') {
            mappedStatus = 'completed';
          } else {
            // Fallback for any other statuses
            mappedStatus = 'draft';
          }
          
          return {
            ...project,
            status: mappedStatus,
            applications_count: applicationCounts[project.id] || 0
          } as Project;
        });
      
      setProjects(filteredProjects);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message);
      toast.error("Failed to load projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: "active" | "draft" | "completed") => {
    try {
      // Map our interface status to database status
      let dbStatus: string;
      if (newStatus === 'active') {
        dbStatus = 'pending'; // or 'approved' based on your business logic
      } else if (newStatus === 'draft') {
        dbStatus = 'draft';
      } else if (newStatus === 'completed') {
        dbStatus = 'completed';
      } else {
        throw new Error("Invalid status");
      }

      // Check if the status is a valid value in the database's status enum
      const { error: checkError } = await supabase
        .from('projects')
        .select('status')
        .eq('id', projectId)
        .limit(1);
        
      if (checkError) {
        console.error('Error checking project status:', checkError);
        toast.error("Failed to update project status. Please try again.");
        return;
      }
        
      const { error } = await supabase
        .from('projects')
        .update({ status: dbStatus })
        .eq('id', projectId);

      if (error) {
        console.error('Error updating project status:', error);
        // If there's an error with the status value, maybe there's a constraint
        if (error.message.includes('check constraint')) {
          toast.error("Unable to update to this status. The status might be restricted.");
        } else {
          toast.error("Failed to update project status. Please try again.");
        }
        throw error;
      }

      // Refresh the projects list
      await fetchProjects();
      toast.success(`Project status updated to ${newStatus}`);
    } catch (err: any) {
      console.error('Error updating project status:', err);
    }
  };

  return { projects, isLoading, error, updateProjectStatus, fetchProjects };
}
