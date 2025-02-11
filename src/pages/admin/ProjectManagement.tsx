
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProjectFilters } from "./components/project-management/ProjectFilters";
import { ProjectsTable } from "./components/project-management/ProjectsTable";

export type ProjectReviewStatus = "pending_review" | "approved" | "rejected" | "needs_modification";

const ProjectManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectReviewStatus | "">("");
  const { toast } = useToast();

  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-projects", statusFilter, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select(`
          *,
          employers (
            company_name
          )
        `)
        .order("created_at", { ascending: false });

      if (statusFilter) {
        query = query.eq("review_status", statusFilter);
      }

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }

      return data;
    },
    meta: {
      onSettled: (_, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load projects",
            variant: "destructive",
          });
        }
      }
    }
  });

  const handleStatusChange = async (projectId: string, newStatus: ProjectReviewStatus, feedback?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No authenticated user");

      // Create project approval record
      const { error: approvalError } = await supabase
        .from("project_approvals")
        .insert({
          project_id: projectId,
          admin_id: user.id,
          status: newStatus,
          feedback
        });

      if (approvalError) throw approvalError;

      // Update project status
      const { error: updateError } = await supabase
        .from("projects")
        .update({ 
          review_status: newStatus,
          admin_feedback: feedback || null 
        })
        .eq("id", projectId);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Project status updated successfully",
      });
    } catch (error) {
      console.error("Error updating project status:", error);
      toast({
        title: "Error",
        description: "Failed to update project status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Project Management</h1>
      </div>

      <ProjectFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ProjectsTable
        projects={projects}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default ProjectManagement;
