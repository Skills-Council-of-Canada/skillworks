
import { Project } from "./projectTypes";

/**
 * Maps database status to our interface status
 */
export function mapDatabaseStatusToInterfaceStatus(dbStatus: string): "active" | "draft" | "completed" {
  if (dbStatus === 'draft') {
    return 'draft';
  } else if (dbStatus === 'active') {
    return 'active';
  } else if (dbStatus === 'completed') {
    return 'completed';
  } else {
    // Fallback for any other statuses
    console.log(`Unknown database status: ${dbStatus}, mapping to draft`);
    return 'draft';
  }
}

/**
 * Maps interface status to database status
 */
export function mapInterfaceStatusToDatabaseStatus(
  newStatus: "active" | "draft" | "completed"
): string {
  // Direct mapping since both use the same values
  return newStatus;
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
      const interfaceStatus = mapDatabaseStatusToInterfaceStatus(project.status);
      return interfaceStatus === status;
    })
    .map(project => {
      return {
        ...project,
        status: mapDatabaseStatusToInterfaceStatus(project.status),
        applications_count: applicationCounts[project.id] || 0
      } as Project;
    });
}
