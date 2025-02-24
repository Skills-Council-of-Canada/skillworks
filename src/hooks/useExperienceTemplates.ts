
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ExperienceTemplate } from "@/types/templates";
import { useToast } from "@/hooks/use-toast";

type RawTemplate = Omit<ExperienceTemplate, 'metadata'> & {
  metadata: Record<string, any>;
};

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
      
      // Transform the metadata to ensure it matches our expected type
      return (data || []).map((template: RawTemplate) => ({
        ...template,
        metadata: {
          expected_outcomes: Array.isArray(template.metadata?.expected_outcomes) 
            ? template.metadata.expected_outcomes 
            : [],
          subcategories: Array.isArray(template.metadata?.subcategories) 
            ? template.metadata.subcategories 
            : [],
          skill_tags: Array.isArray(template.metadata?.skill_tags) 
            ? template.metadata.skill_tags 
            : [],
          duration_weeks: typeof template.metadata?.duration_weeks === 'number' 
            ? template.metadata.duration_weeks 
            : 0,
          team_size: typeof template.metadata?.team_size === 'number' 
            ? template.metadata.team_size 
            : 1,
          milestones: Array.isArray(template.metadata?.milestones) 
            ? template.metadata.milestones 
            : []
        }
      })) as ExperienceTemplate[];
    }
  });

  const createProjectFromTemplate = useMutation({
    mutationFn: async ({ templateId, employerId }: { templateId: string; employerId: string }) => {
      // First get the template
      const { data: template, error: templateError } = await supabase
        .from("experience_templates")
        .select("*")
        .eq("id", templateId)
        .single();

      if (templateError) throw templateError;

      // Create project with required fields
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert([{
          title: template.title,
          description: template.description,
          trade_type: template.trade_type,
          skill_level: template.skill_level,
          employer_id: employerId,
          template_id: template.id,
          status: "draft",
          review_status: "pending_review",
          start_date: new Date().toISOString().split('T')[0],
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          location_type: "On-site",
          positions: 1
        }])
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
