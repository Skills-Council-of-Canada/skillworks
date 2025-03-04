
import { useState, useEffect, useCallback, useRef } from "react";
import type { ProjectFormData } from "@/types/project";

const STORAGE_KEY = "project_form_data";

export function useProjectFormPersistence() {
  const initialLoadDone = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to load saved data - extracted for cleaner code
  const getSavedData = useCallback(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        console.log("Loading saved form data from localStorage");
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

  // Save to localStorage with debounce to avoid excessive writes
  const saveToStorage = useCallback(() => {
    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set a new timeout to save data
    saveTimeoutRef.current = setTimeout(() => {
      try {
        console.log("Saving form data to localStorage", currentStep);
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
      } catch (error) {
        console.error("Error saving form data:", error);
      }
    }, 300);
  }, [formData, currentStep]);

  // Save data when form data or step changes
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      return;
    }
    
    saveToStorage();
    
    // Clean up timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData, currentStep, saveToStorage]);

  // Explicit wrapped setters
  const wrappedSetFormData = useCallback((value: React.SetStateAction<Partial<ProjectFormData>>) => {
    console.log("Setting form data:", typeof value === 'function' ? 'function' : value);
    setFormData(value);
  }, []);

  const wrappedSetCurrentStep = useCallback((step: number) => {
    console.log("Setting current step to:", step);
    setCurrentStep(step);
  }, []);

  const clearSavedData = useCallback(() => {
    console.log("Clearing saved data from localStorage");
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
