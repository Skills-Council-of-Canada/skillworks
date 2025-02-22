
import { useState } from "react";
import { ProjectFilters } from "./components/project-management/ProjectFilters";
import { ProjectsTable } from "./components/project-management/ProjectsTable";
import type { ProjectReviewStatus } from "./ProjectManagement";

export type StatusFilterType = ProjectReviewStatus | "all";

const ProjectManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");

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
          <ProjectsTable searchQuery={searchQuery} statusFilter={statusFilter} />
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
