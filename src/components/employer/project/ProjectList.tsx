import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProjects } from "@/hooks/employer/useProjects";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import { toast } from "sonner";
import { ProjectTable } from "./ProjectTable";
import { MobileProjectCard } from "./MobileProjectCard";
import { getStatusColor } from "./projectUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectListProps {
  status: "active" | "draft" | "completed";
}

export const ProjectList = ({ status }: ProjectListProps) => {
  const navigate = useNavigate();
  const { projects, isLoading, updateProjectStatus } = useProjects(status);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleView = (project: any) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleEdit = (projectId: string) => {
    navigate(`/employer/projects/edit/${projectId}`);
  };

  const handleClose = (projectId: string) => {
    toast.info("This feature is coming soon!");
    console.log("Close project:", projectId);
  };

  const handleDelete = (projectId: string) => {
    toast.info("This feature is coming soon!");
    console.log("Delete project:", projectId);
  };

  const handleApprove = async (projectId: string) => {
    await updateProjectStatus(projectId, "active");
  };

  // Mobile card view
  if (isMobile) {
    return (
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center text-gray-500 py-4">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No projects found</p>
        ) : (
          projects.map((project) => (
            <MobileProjectCard 
              key={project.id} 
              project={project}
              onView={handleView}
              onEdit={handleEdit}
              onClose={handleClose}
              onDelete={handleDelete}
              onApprove={handleApprove}
              getStatusColor={getStatusColor}
            />
          ))
        )}
        <ProjectDetailsDialog 
          project={selectedProject}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      </div>
    );
  }

  // Desktop table view
  return (
    <>
      <ProjectTable 
        projects={projects}
        isLoading={isLoading}
        status={status}
        onView={handleView}
        onEdit={handleEdit}
        onClose={handleClose}
        onDelete={handleDelete}
        onApprove={handleApprove}
        getStatusColor={getStatusColor}
      />
      <ProjectDetailsDialog 
        project={selectedProject}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
};
