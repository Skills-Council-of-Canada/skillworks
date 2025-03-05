
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  fetchEmployerId, 
  fetchProjectsByEmployerId, 
  fetchApplicationCounts,
  fetchProjectStatus,
  updateProjectStatusInDb
} from "./api/projectApi";
import { 
  ProjectStatusUI, 
  mapDbStatusToUiStatus, 
  mapUiStatusToDbStatus,
  filterProjectsByStatus
} from "./utils/projectStatusUtils";

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

export function useProjects(status: ProjectStatusUI) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [status]);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      // Get the current employer ID
      const employerId = await fetchEmployerId();
      
      if (!employerId) {
        throw new Error("Could not determine employer ID");
      }
      
      // Fetch projects for this employer
      const { data: projectsData, error: projectsError } = 
        await fetchProjectsByEmployerId(employerId);
      
      if (projectsError) {
        throw new Error(projectsError);
      }
      
      if (!projectsData) {
        throw new Error("No projects data returned");
      }

      // Get the application counts for each project
      const projectIds = projectsData.map(project => project.id);
      const applicationCounts = await fetchApplicationCounts(projectIds);
      
      // Map database status to UI status and add application counts
      const projectsWithStatus = projectsData.map(project => ({
        ...project,
        status: mapDbStatusToUiStatus(project.status),
        applications_count: applicationCounts[project.id] || 0
      }));
      
      // Filter projects based on requested status
      const filteredProjects = filterProjectsByStatus(projectsWithStatus, status);
      
      setProjects(filteredProjects);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message);
      toast.error("Failed to load projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: ProjectStatusUI) => {
    try {
      // Get the current status of the project
      const { data: currentProject, error: fetchError } = await fetchProjectStatus(projectId);
      
      if (fetchError || !currentProject) {
        toast.error("Failed to fetch current project status. Please try again.");
        return;
      }
      
      // Map to the appropriate database status
      const dbStatus = mapUiStatusToDbStatus(newStatus, currentProject.status);
      
      console.log(`Attempting to update project ${projectId} from ${currentProject.status} to ${dbStatus}`);
      
      // Update the status in the database
      const { error } = await updateProjectStatusInDb(projectId, dbStatus);
      
      if (error) {
        return; // Error handling is done in the API function
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
