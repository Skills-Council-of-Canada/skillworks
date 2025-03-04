
import { useState, useEffect, useCallback, useRef } from "react";
import type { ProjectFormData } from "@/types/project";

const STORAGE_KEY = "project_form_data";

export function useProjectFormPersistence() {
  const initialLoadDone = useRef(false);
  const shouldSave = useRef(false);
  
  // Function to load saved data - extracted for cleaner code
  const getSavedData = useCallback(() => {
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
  
  // Use state initializers to avoid unnecessary renders
  const [currentStep, setCurrentStep] = useState(() => getSavedData().step);
  const [formData, setFormData] = useState<Partial<ProjectFormData>>(() => getSavedData().data);

  // Save to localStorage whenever form data or step changes
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      return;
    }
    
    if (!shouldSave.current) {
      return;
    }
    shouldSave.current = false;
    
    try {
      // Create a deep copy of the data to avoid modifying the original
      const dataToSave = JSON.stringify(formData, (key, value) => {
        // Handle Date objects
        if (key === 'startDate' || key === 'endDate') {
          return value instanceof Date ? value.toISOString() : value;
        }
        // Skip file objects
        if (key === 'images' || key === 'documents') {
          return undefined;
        }
        return value;
      });
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        step: currentStep,
        data: JSON.parse(dataToSave)
      }));
      
      console.log("Form data saved to localStorage", currentStep);
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  }, [formData, currentStep]);

  // Explicit wrapped setters to trigger saving
  const wrappedSetFormData = useCallback((value: React.SetStateAction<Partial<ProjectFormData>>) => {
    shouldSave.current = true;
    setFormData(value);
  }, []);

  const wrappedSetCurrentStep = useCallback((step: number) => {
    console.log("Setting current step to:", step);
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
