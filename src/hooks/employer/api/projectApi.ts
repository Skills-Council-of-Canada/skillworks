
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ProjectApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Fetch employer ID for the current user
export const fetchEmployerId = async (): Promise<string | null> => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      throw userError;
    }
    
    if (!userData.user) {
      throw new Error("No authenticated user found");
    }
    
    const { data: employerData, error: employerError } = await supabase
      .from('employers')
      .select('id')
      .eq('user_id', userData.user.id)
      .single();
    
    if (employerError) {
      throw employerError;
    }
    
    return employerData.id;
  } catch (error: any) {
    console.error("Error fetching employer ID:", error);
    return null;
  }
};

// Fetch projects by employer ID
export const fetchProjectsByEmployerId = async (employerId: string): Promise<ProjectApiResponse<any[]>> => {
  try {
    const { data, error } = await supabase
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
      .eq('employer_id', employerId);
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return { data: null, error: error.message };
  }
};

// Fetch application counts for projects
export const fetchApplicationCounts = async (projectIds: string[]): Promise<Record<string, number>> => {
  try {
    // If there are no projects, return an empty object
    if (projectIds.length === 0) {
      return {};
    }
    
    const { data: applicationsData, error: applicationsError } = await supabase
      .from('applications')
      .select('project_id')
      .in('project_id', projectIds)
      .or('status.eq.pending,status.eq.approved');
    
    if (applicationsError) {
      throw applicationsError;
    }
    
    // Count applications per project
    const counts: Record<string, number> = {};
    
    if (applicationsData) {
      applicationsData.forEach((app: any) => {
        if (app.project_id) {
          counts[app.project_id] = (counts[app.project_id] || 0) + 1;
        }
      });
    }
    
    return counts;
  } catch (error: any) {
    console.error("Error fetching application counts:", error);
    return {};
  }
};

// Get current project status
export const fetchProjectStatus = async (projectId: string): Promise<ProjectApiResponse<{ status: string }>> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('status')
      .eq('id', projectId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching project status:", error);
    return { data: null, error: error.message };
  }
};

// Update project status
export const updateProjectStatusInDb = async (projectId: string, dbStatus: string): Promise<ProjectApiResponse<null>> => {
  try {
    const { error } = await supabase
      .from('projects')
      .update({ status: dbStatus })
      .eq('id', projectId);
    
    if (error) {
      throw error;
    }
    
    return { data: null, error: null };
  } catch (error: any) {
    console.error("Error updating project status:", error);
    
    // Handle constraint errors
    if (error.message && error.message.includes('check constraint')) {
      toast.error("Unable to update to this status. The status might be restricted. Please contact support for assistance.");
    } else {
      toast.error("Failed to update project status. Please try again.");
    }
    
    return { data: null, error: error.message };
  }
};
