
import { useState, useEffect } from "react";
import type { ProjectFormData } from "@/types/project";

const STORAGE_KEY = "project_form_data";

export function useProjectFormPersistence() {
  // Load saved data from localStorage on initial render
  const loadSavedData = (): { step: number; data: Partial<ProjectFormData> } => {
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
  };
  
  const savedState = loadSavedData();
  const [currentStep, setCurrentStep] = useState(savedState.step);
  const [formData, setFormData] = useState<Partial<ProjectFormData>>(savedState.data);

  // Save to localStorage whenever form data or step changes
  useEffect(() => {
    try {
      // Create a copy of the data for serialization
      const dataToSave = { ...formData };
      
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

  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    clearSavedData
  };
}
