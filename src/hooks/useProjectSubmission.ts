
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { ProjectFormData } from "@/types/project";
import type { Database } from "@/integrations/supabase/types";

export const useProjectSubmission = () => {
  const navigate = useNavigate();

  const createProjectData = (formData: Partial<ProjectFormData>, status: 'published' | 'draft', employerId: string): Database['public']['Tables']['projects']['Insert'] => {
    return {
      employer_id: employerId,
      title: formData.title!,
      description: formData.description!,
      trade_type: formData.tradeType!,
      skill_level: formData.skillLevel!,
      start_date: formData.startDate!.toISOString().split('T')[0],
      end_date: formData.endDate!.toISOString().split('T')[0],
      location_type: formData.locationType!,
      site_address: formData.address,
      positions: formData.positions!,
      flexibility: formData.flexibility,
      safety_requirements: formData.safetyRequirements,
      status
    };
  };

  const uploadFiles = async (files: File[], type: 'image' | 'document', projectId: string) => {
    const uploadPromises = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('projectId', projectId);

      return supabase.functions.invoke('upload-project-files', {
        body: formData,
      });
    });

    return Promise.all(uploadPromises);
  };

  const handlePublish = async (formData: Partial<ProjectFormData>, userId: string) => {
    try {
      const { data: employerData, error: employerError } = await supabase
        .from('employers')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (employerError) throw employerError;

      const projectData = createProjectData(formData, 'published', employerData.id);

      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (projectError) throw projectError;

      // Handle media uploads if any
      if (formData.images?.length || formData.documents?.length) {
        const uploadPromises = [];

        if (formData.images?.length) {
          uploadPromises.push(uploadFiles(formData.images, 'image', project.id));
        }

        if (formData.documents?.length) {
          uploadPromises.push(uploadFiles(formData.documents, 'document', project.id));
        }

        await Promise.all(uploadPromises);
      }

      toast.success("Project published successfully!");
      navigate("/employer");
    } catch (error) {
      console.error('Error publishing project:', error);
      toast.error("Failed to publish project. Please try again.");
    }
  };

  const handleSaveDraft = async (formData: Partial<ProjectFormData>, userId: string) => {
    try {
      const { data: employerData, error: employerError } = await supabase
        .from('employers')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (employerError) throw employerError;

      const projectData = createProjectData(formData, 'draft', employerData.id);

      await supabase
        .from('projects')
        .insert([projectData]);

      toast.success("Project saved as draft!");
      navigate("/employer");
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error("Failed to save draft. Please try again.");
    }
  };

  return {
    handlePublish,
    handleSaveDraft
  };
};
