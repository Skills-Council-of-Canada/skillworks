
import { Project } from "./projectTypes";

/**
 * Maps database status to our interface status
 */
export function mapDatabaseStatusToInterfaceStatus(dbStatus: string): "active" | "draft" | "completed" {
  if (dbStatus === 'draft') {
    return 'draft';
  } else if (dbStatus === 'pending' || dbStatus === 'approved') {
    return 'active';
  } else if (dbStatus === 'completed') {
    return 'completed';
  } else {
    // Fallback for any other statuses
    return 'draft';
  }
}

/**
 * Maps interface status to database status
 */
export function mapInterfaceStatusToDatabaseStatus(
  newStatus: "active" | "draft" | "completed", 
  currentStatus: string
): string {
  // If moving from draft to active, we need to use 'pending' or maybe 'approved'
  // depending on workflow
  if (newStatus === 'active' && currentStatus === 'draft') {
    // When activating a draft project, set it to 'pending' first
    return 'pending';
  } else if (newStatus === 'draft') {
    return 'draft';
  } else if (newStatus === 'completed') {
    return 'completed'; 
  } else if (newStatus === 'active' && currentStatus === 'pending') {
    // If it's already pending and we're trying to make it active, use 'approved'
    return 'approved';
  } else {
    // For other cases, use the newStatus (might need adjustments)
    return newStatus;
  }
}

/**
 * Filters and maps projects based on the requested status
 */
export function filterAndMapProjects(
  projectsData: any[], 
  applicationCounts: { [key: string]: number },
  status: "active" | "draft" | "completed"
): Project[] {
  return projectsData
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
      return {
        ...project,
        status: mapDatabaseStatusToInterfaceStatus(project.status),
        applications_count: applicationCounts[project.id] || 0
      } as Project;
    });
}
