
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ExperienceTemplate } from "@/types/templates";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/types/supabase";

// Update the SupabaseTemplate type to use the Json type from our types
type SupabaseTemplate = {
  id: string;
  title: string;
  description: string;
  trade_type: string;
  skill_level: string;
  created_at: string;
  updated_at: string;
  metadata: Json;
  status: string;
  is_public: boolean;
  educator_id: string;
  experience_id?: string;
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
      
      // Transform the data with proper type handling
      return (data || []).map((template: SupabaseTemplate) => {
        // Parse the metadata JSON if it's a string
        const parsedMetadata = typeof template.metadata === 'string' 
          ? JSON.parse(template.metadata)
          : template.metadata;

        return {
          ...template,
          status: template.status as "active" | "inactive",
          metadata: {
            expected_outcomes: Array.isArray(parsedMetadata?.expected_outcomes) 
              ? parsedMetadata.expected_outcomes 
              : [],
            subcategories: Array.isArray(parsedMetadata?.subcategories) 
              ? parsedMetadata.subcategories 
              : [],
            skill_tags: Array.isArray(parsedMetadata?.skill_tags) 
              ? parsedMetadata.skill_tags 
              : [],
            duration_weeks: typeof parsedMetadata?.duration_weeks === 'number' 
              ? parsedMetadata.duration_weeks 
              : 0,
            team_size: typeof parsedMetadata?.team_size === 'number' 
              ? parsedMetadata.team_size 
              : 1,
            milestones: Array.isArray(parsedMetadata?.milestones) 
              ? parsedMetadata.milestones 
              : []
          }
        } as ExperienceTemplate;
      });
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
