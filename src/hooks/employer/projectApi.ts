
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
export async function updateProjectStatusInDb(projectId: string, dbStatus: string) {
  try {
    console.log(`Updating project ${projectId} to status ${dbStatus}`);
    
    // Get valid project statuses first
    const validStatuses = await fetchValidProjectStatuses();
    
    // Check if the status is valid
    if (!validStatuses.includes(dbStatus)) {
      const errorMsg = `Status '${dbStatus}' is not valid for projects. Valid statuses are: ${validStatuses.join(', ')}`;
      console.error(errorMsg);
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const { error } = await supabase
      .from('projects')
      .update({ status: dbStatus })
      .eq('id', projectId);

    if (error) {
      console.error('Error updating project status:', error);
      
      // Handle specific error cases
      if (error.message.includes('check constraint')) {
        toast.error("Unable to update to this status. The status might be restricted. Please use one of: draft, active, or completed");
      } else {
        toast.error("Failed to update project status. Please try again.");
      }
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
 * Fetches valid status values for projects
 */
export async function fetchValidProjectStatuses() {
  try {
    // Try to get valid project statuses via RPC function
    const { data, error } = await supabase.rpc('get_valid_project_statuses');
    
    if (error) {
      console.error('Error fetching valid project statuses via RPC:', error);
      
      // Fallback: query the enum values directly with proper SQL
      const { data: enumData, error: enumError } = await supabase
        .from('projects')
        .select('status')
        .limit(1);
        
      if (enumError) {
        console.error('Error fetching enum sample:', enumError);
        // Final fallback: hardcoded values
        return ['draft', 'active', 'completed'];
      }
      
      // If we got a sample, it means these status values are valid
      console.log('Sample project status:', enumData);
      return ['draft', 'active', 'completed'];
    }
    
    return data || ['draft', 'active', 'completed'];
  } catch (err) {
    console.error('Error in fetchValidProjectStatuses:', err);
    // Fallback to a hard-coded list of known statuses
    return ['draft', 'active', 'completed'];
  }
}
