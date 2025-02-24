
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ExperienceTemplate } from "@/types/templates";
import { useToast } from "@/hooks/use-toast";

export const useExperienceTemplates = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const templates = useQuery({
    queryKey: ["experience-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience_templates")
        .select("*")
        .eq("status", "active")
        .eq("is_public", true);

      if (error) throw error;
      return data as ExperienceTemplate[];
    }
  });

  const createProjectFromTemplate = useMutation({
    mutationFn: async ({ templateId, employerId }: { templateId: string; employerId: string }) => {
      const { data: template, error: templateError } = await supabase
        .from("experience_templates")
        .select("*")
        .eq("id", templateId)
        .single();

      if (templateError) throw templateError;

      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          title: template.title,
          description: template.description,
          trade_type: template.trade_type,
          skill_level: template.skill_level,
          employer_id: employerId,
          template_id: template.id,
          status: "draft",
          review_status: "pending_review"
        })
        .select()
        .single();

      if (projectError) throw projectError;
      return project;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Project created from template successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to create project from template",
        variant: "destructive",
      });
      console.error("Error creating project from template:", error);
    }
  });

  return {
    templates,
    createProjectFromTemplate,
  };
};
