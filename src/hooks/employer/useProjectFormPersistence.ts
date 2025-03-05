
import { useState, useEffect, useCallback } from 'react';
import { ProjectFormData, TradeType, SkillLevel, LocationType } from '@/types/project';
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
        // Cast the data to any to bypass TypeScript strictness while we access fields
        const rawData = data as any;
        
        // Transform database model to form data model with proper type conversions
        const projectFormData: Partial<ProjectFormData> = {
          title: rawData.title,
          description: rawData.description,
          tradeType: rawData.trade_type as TradeType,
          skillLevel: rawData.skill_level as SkillLevel,
          startDate: rawData.start_date ? new Date(rawData.start_date) : undefined,
          endDate: rawData.end_date ? new Date(rawData.end_date) : undefined,
          locationType: rawData.location_type as LocationType,
          address: rawData.site_address || '',
          positions: rawData.positions,
          certifications: rawData.certifications_required || [],
          safetyRequirements: rawData.safety_requirements || [],
          toolsProvided: Boolean(rawData.tools_provided),
          requiredTools: rawData.required_tools || [],
          subcategories: rawData.subcategories || [],
          additionalInfo: rawData.additional_feedback || rawData.admin_feedback || "",
          expectations: rawData.expectations || "",
          status: rawData.status
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
