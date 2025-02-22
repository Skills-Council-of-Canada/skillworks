
import { useState } from "react";
import { ProjectFilters } from "./components/project-management/ProjectFilters";
import { ProjectsTable } from "./components/project-management/ProjectsTable";
import { ProjectReviewStatus } from "./types/project";
import { useQuery, useMutation } from "@tanstack/react-query";

export type StatusFilterType = ProjectReviewStatus | "all";

const ProjectManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");

  const { data: projects, isLoading, refetch } = useQuery({
    queryKey: ['projects', { searchQuery, statusFilter }],
    queryFn: async () => {
      // Replace with actual API call
      return [];
    }
  });

  const updateProjectStatus = useMutation({
    mutationFn: async (params: { projectId: string; newStatus: ProjectReviewStatus; feedback?: string }) => {
      // Replace with actual API call
      const { projectId, newStatus, feedback } = params;
      // Update project status logic here
    },
    onSuccess: () => {
      refetch();
    }
  });

  const handleStatusChange = async (projectId: string, newStatus: ProjectReviewStatus, feedback?: string) => {
    await updateProjectStatus.mutateAsync({ projectId, newStatus, feedback });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Project Management</h1>
        <div className="w-full md:w-auto">
          <ProjectFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-full inline-block align-middle">
          <ProjectsTable 
            onStatusChange={handleStatusChange}
            projects={projects}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
