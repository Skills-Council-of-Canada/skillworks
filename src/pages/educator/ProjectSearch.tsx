
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useProjectSearch } from "./hooks/useProjectSearch";
import { ProjectSearchFilters } from "./components/ProjectSearchFilters";
import { ProjectCard } from "./components/ProjectCard";
import { Project } from "./types/project";

const ProjectSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    locationType: "",
    projectType: "",
    industry: "",
  });

  const { data: projects, isLoading } = useProjectSearch(filters);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredProjects = projects?.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProject = (projectId: string) => {
    navigate(`/educator/projects/${projectId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Industry Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ProjectSearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Loading projects...</p>
        ) : filteredProjects?.length === 0 ? (
          <p>No projects found matching your criteria</p>
        ) : (
          filteredProjects?.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewProject={handleViewProject}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectSearch;
