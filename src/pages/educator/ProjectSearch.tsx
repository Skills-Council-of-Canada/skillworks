
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  trade_type: string;
  location_type: string;
  project_type: string;
  industry: string;
  employer: {
    company_name: string;
    rating: number;
    rating_count: number;
  };
}

const ProjectSearch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    locationType: "",
    projectType: "",
    industry: "",
  });

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", filters],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select(`
          *,
          employer:employers(company_name, rating, rating_count)
        `)
        .eq("status", "published");

      if (filters.locationType) {
        query = query.eq("location_type", filters.locationType);
      }
      if (filters.projectType) {
        query = query.eq("project_type", filters.projectType);
      }
      if (filters.industry) {
        query = query.eq("industry", filters.industry);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as Project[];
    },
  });

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
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                value={filters.locationType}
                onValueChange={(value) =>
                  setFilters({ ...filters, locationType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="On-site">On-site</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.projectType}
                onValueChange={(value) =>
                  setFilters({ ...filters, projectType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apprenticeship">Apprenticeship</SelectItem>
                  <SelectItem value="training">Training Program</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.industry}
                onValueChange={(value) =>
                  setFilters({ ...filters, industry: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Construction">Construction</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Loading projects...</p>
        ) : (
          filteredProjects?.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm">
                      {project.employer.rating?.toFixed(1) || "N/A"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({project.employer.rating_count})
                    </span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {project.employer.company_name}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{project.trade_type}</Badge>
                  <Badge variant="outline">{project.location_type}</Badge>
                  <Badge variant="outline">{project.project_type}</Badge>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleViewProject(project.id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectSearch;
