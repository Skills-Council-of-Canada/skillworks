
// Define the possible project statuses for our interface and database
export type ProjectStatusUI = "active" | "draft" | "completed";
export type ProjectStatusDB = "draft" | "pending" | "approved" | "completed";

// Maps database status to UI status
export const mapDbStatusToUiStatus = (dbStatus: string): ProjectStatusUI => {
  if (dbStatus === 'draft') {
    return 'draft';
  } else if (dbStatus === 'pending' || dbStatus === 'approved') {
    return 'active';
  } else if (dbStatus === 'completed') {
    return 'completed';
  }
  // Default fallback for unknown statuses
  return 'draft';
};

// Maps UI status to database status based on current database status
export const mapUiStatusToDbStatus = (
  uiStatus: ProjectStatusUI, 
  currentDbStatus: string
): string => {
  // If moving from draft to active, we need to use 'pending' first
  if (uiStatus === 'active' && currentDbStatus === 'draft') {
    return 'pending';
  }
  // If already pending and making active, use 'approved'
  else if (uiStatus === 'active' && currentDbStatus === 'pending') {
    return 'approved';
  }
  // Direct mapping for other cases
  else if (uiStatus === 'draft') {
    return 'draft';
  }
  else if (uiStatus === 'completed') {
    return 'completed';
  }
  
  // For other edge cases, just use the UI status as fallback
  return uiStatus;
};

// Filter projects based on status
export const filterProjectsByStatus = (
  projects: any[], 
  status: ProjectStatusUI
): any[] => {
  return projects.filter(project => {
    if (status === 'draft') {
      return project.status === 'draft';
    } else if (status === 'active') {
      return project.status === 'pending' || project.status === 'approved';
    } else if (status === 'completed') {
      return project.status === 'completed';
    }
    return false;
  });
};
