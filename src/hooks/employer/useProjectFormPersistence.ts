
import { useState, useEffect, useCallback, useRef } from "react";
import type { ProjectFormData } from "@/types/project";

const STORAGE_KEY = "project_form_data";

export function useProjectFormPersistence() {
  const initialLoadDone = useRef(false);
  
  // Load saved data from localStorage on initial render
  const loadSavedData = useCallback((): { step: number; data: Partial<ProjectFormData> } => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        
        // Convert date strings back to Date objects
        if (parsed.data.startDate) {
          parsed.data.startDate = new Date(parsed.data.startDate);
        }
        if (parsed.data.endDate) {
          parsed.data.endDate = new Date(parsed.data.endDate);
        }
        
        return parsed;
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }
    return { step: 1, data: {} };
  }, []);
  
  const [currentStep, setCurrentStep] = useState(() => loadSavedData().step);
  const [formData, setFormData] = useState<Partial<ProjectFormData>>(() => loadSavedData().data);
  const shouldSave = useRef(false);

  // Save to localStorage whenever form data or step changes
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      return;
    }
    
    try {
      // Only save if explicitly requested (via setFormData or setCurrentStep)
      if (!shouldSave.current) {
        return;
      }
      shouldSave.current = false;
      
      // Create a deep copy of the data to avoid modifying the original
      const dataToSave = JSON.parse(JSON.stringify(formData));
      
      // Convert Date objects to ISO strings for proper serialization
      if (dataToSave.startDate instanceof Date) {
        dataToSave.startDate = dataToSave.startDate.toISOString();
      }
      if (dataToSave.endDate instanceof Date) {
        dataToSave.endDate = dataToSave.endDate.toISOString();
      }
      
      // Don't save File objects as they can't be serialized
      if (dataToSave.images) {
        delete dataToSave.images;
      }
      if (dataToSave.documents) {
        delete dataToSave.documents;
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        step: currentStep,
        data: dataToSave
      }));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }, [formData, currentStep]);

  // Wrap the state setters to trigger saves when called
  const wrappedSetFormData = useCallback((value: React.SetStateAction<Partial<ProjectFormData>>) => {
    shouldSave.current = true;
    setFormData(value);
  }, []);

  const wrappedSetCurrentStep = useCallback((step: number) => {
    shouldSave.current = true;
    setCurrentStep(step);
  }, []);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    currentStep,
    setCurrentStep: wrappedSetCurrentStep,
    formData,
    setFormData: wrappedSetFormData,
    clearSavedData
  };
}
