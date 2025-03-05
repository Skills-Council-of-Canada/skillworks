
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Project } from "./projectTypes";
import { fetchEmployerProjects, updateProjectStatusInDb } from "./projectApi";
import { filterAndMapProjects } from "./projectStatusUtils";

export type { Project } from "./projectTypes";

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
      const { projects: projectsData, applicationsCount } = await fetchEmployerProjects();
      
      // Filter and map projects
      const filteredProjects = filterAndMapProjects(projectsData, applicationsCount, status);
      
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
      console.log(`Updating project status from ${status} to ${newStatus}`);
      
      // Pass the status directly to the database update function
      await updateProjectStatusInDb(projectId, newStatus);

      // Refresh the projects list
      await fetchProjects();
      toast.success(`Project status updated to ${newStatus}`);
      return true;
    } catch (err: any) {
      console.error('Error updating project status:', err);
      toast.error("Failed to update project status. Please try again.");
      throw err;
    }
  };

  return { projects, isLoading, error, updateProjectStatus, fetchProjects };
}
