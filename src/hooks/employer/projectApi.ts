import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Project } from "./projectTypes";

/**
 * Fetches projects for the current employer from Supabase
 */
export async function fetchEmployerProjects() {
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
    
    // Fetch projects based on employer ID
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
      return { projects: [], applicationsCount: {} };
    }
    
    // Fetch applications data
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
    
    return { projects: projectsData, applicationsCount: applicationCounts };
  } catch (err: any) {
    console.error('Error fetching projects:', err);
    throw err;
  }
}

/**
 * Updates a project's status in the database
 */
export async function updateProjectStatusInDb(projectId: string, newStatus: string) {
  try {
    console.log(`Updating project ${projectId} to status ${newStatus}`);
    
    // Make the update directly, trust the database to enforce constraints
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', projectId);

    if (error) {
      console.error('Error updating project status:', error);
      toast.error("Failed to update project status. Please try again.");
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error('Error in updateProjectStatusInDb:', err);
    throw err;
  }
}

/**
 * Fetches the current status of a project
 */
export async function fetchProjectStatus(projectId: string) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('status')
      .eq('id', projectId)
      .single();
    
    if (error) {
      console.error('Error fetching current project status:', error);
      throw error;
    }
    
    return data.status;
  } catch (err) {
    console.error('Error in fetchProjectStatus:', err);
    throw err;
  }
}

/**
 * Fetches valid status values for projects - this uses hardcoded values
 * since we know the database constraints
 */
export async function fetchValidProjectStatuses(): Promise<string[]> {
  // Return the valid statuses directly since we know what they are
  return ["draft", "active", "completed"];
}
