
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ProjectFormData } from '@/types/project';

export const useProjectSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const transformFormToDbModel = (formData: Partial<ProjectFormData>, employerId: string, status: string) => {
    return {
      employer_id: employerId,
      title: formData.title || '',
      description: formData.description || '',
      trade_type: formData.tradeType || '',
      skill_level: formData.skillLevel || '',
      start_date: formData.startDate || null,
      end_date: formData.endDate || null,
      location_type: formData.locationType || '',
      address: formData.address || '',
      positions: formData.positions || 1,
      learner_type: formData.learnerType || [],
      education_level: formData.educationLevel || [],
      required_skills: formData.requiredSkills || [],
      preferred_skills: formData.preferredSkills || [],
      media_files: formData.mediaFiles || [],
      additional_info: formData.additionalInfo || '',
      expectations: formData.expectations || '',
      status: status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  };

  const handlePublish = async (formData: Partial<ProjectFormData>, employerId: string, projectId?: string) => {
    setIsSubmitting(true);
    try {
      const projectData = transformFormToDbModel(formData, employerId, 'active');
      
      let result;
      
      if (projectId) {
        // Update existing project
        result = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectId);
          
        if (result.error) throw result.error;
        toast.success('Project updated successfully!');
      } else {
        // Create new project
        result = await supabase
          .from('projects')
          .insert(projectData)
          .select();
          
        if (result.error) throw result.error;
        toast.success('Project published successfully!');
      }
      
      navigate('/employer/projects');
    } catch (error) {
      console.error('Error submitting project:', error);
      toast.error('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async (formData: Partial<ProjectFormData>, employerId: string, projectId?: string) => {
    setIsSubmitting(true);
    try {
      const projectData = transformFormToDbModel(formData, employerId, 'draft');
      
      let result;
      
      if (projectId) {
        // Update existing draft
        result = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectId);
          
        if (result.error) throw result.error;
        toast.success('Draft updated successfully!');
      } else {
        // Create new draft
        result = await supabase
          .from('projects')
          .insert(projectData)
          .select();
          
        if (result.error) throw result.error;
        toast.success('Draft saved successfully!');
      }
      
      navigate('/employer/projects');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handlePublish,
    handleSaveDraft,
    isSubmitting
  };
};
