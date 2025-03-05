
import { useState, useEffect, useCallback } from 'react';
import { ProjectFormData, TradeType, SkillLevel, LocationType } from '@/types/project';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  saveProjectFormData,
  saveProjectFormStep,
  loadProjectFormData,
  loadProjectFormStep,
  clearProjectFormData
} from './utils/localStorageUtils';

export const useProjectFormPersistence = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProjectFormData>>({});

  // Load saved data on initial mount
  useEffect(() => {
    const savedData = loadProjectFormData();
    const savedStep = loadProjectFormStep();
    
    if (savedData) {
      setFormData(savedData);
    }
    
    if (savedStep) {
      setCurrentStep(savedStep);
    }
  }, []);

  // Save data on change
  useEffect(() => {
    saveProjectFormData(formData);
    saveProjectFormStep(currentStep);
  }, [formData, currentStep]);

  const clearSavedData = useCallback(() => {
    clearProjectFormData();
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
