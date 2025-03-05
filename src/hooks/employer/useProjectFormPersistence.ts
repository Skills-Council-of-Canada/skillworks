
import { useState, useEffect, useCallback } from 'react';
import { ProjectFormData } from '@/types/project';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const STORAGE_KEY = 'project_form_data';

export const useProjectFormPersistence = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProjectFormData>>({});

  // Load saved data on initial mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem('project_form_step');
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        console.log('Loaded saved project data', parsedData);
      } catch (e) {
        console.error('Error parsing saved project data', e);
      }
    }
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  // Save data on change
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      console.log('Saved project form data', formData);
    }
    
    localStorage.setItem('project_form_step', currentStep.toString());
  }, [formData, currentStep]);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('project_form_step');
    setFormData({});
    setCurrentStep(1);
  }, []);

  // Function to load project data for editing
  const loadProjectData = useCallback(async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        // Transform database model to form data model
        const projectFormData: Partial<ProjectFormData> = {
          title: data.title,
          description: data.description,
          tradeType: data.trade_type,
          skillLevel: data.skill_level,
          startDate: data.start_date,
          endDate: data.end_date,
          locationType: data.location_type,
          address: data.address,
          positions: data.positions,
          learnerType: data.learner_type,
          educationLevel: data.education_level,
          requiredSkills: data.required_skills,
          preferredSkills: data.preferred_skills,
          mediaFiles: data.media_files || [],
          additionalInfo: data.additional_info,
          expectations: data.expectations,
          status: data.status
        };
        
        setFormData(projectFormData);
        console.log('Loaded project data for editing', projectFormData);
      }
    } catch (error) {
      console.error('Error loading project data:', error);
      toast.error('Failed to load project data. Please try again.');
    }
  }, []);

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    clearSavedData,
    loadProjectData
  };
};
