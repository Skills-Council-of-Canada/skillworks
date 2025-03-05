
import { ProjectFormData } from '@/types/project';

const PROJECT_FORM_KEY = 'project_form_data';
const PROJECT_STEP_KEY = 'project_form_step';

/**
 * Saves project form data to localStorage
 */
export const saveProjectFormData = (data: Partial<ProjectFormData>): void => {
  if (Object.keys(data).length > 0) {
    localStorage.setItem(PROJECT_FORM_KEY, JSON.stringify(data));
    console.log('Saved project form data', data);
  }
};

/**
 * Saves the current form step to localStorage
 */
export const saveProjectFormStep = (step: number): void => {
  localStorage.setItem(PROJECT_STEP_KEY, step.toString());
};

/**
 * Loads project form data from localStorage
 */
export const loadProjectFormData = (): Partial<ProjectFormData> | null => {
  const savedData = localStorage.getItem(PROJECT_FORM_KEY);
  
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      console.log('Loaded saved project data', parsedData);
      return parsedData;
    } catch (e) {
      console.error('Error parsing saved project data', e);
      return null;
    }
  }
  
  return null;
};

/**
 * Loads the saved form step from localStorage
 */
export const loadProjectFormStep = (): number | null => {
  const savedStep = localStorage.getItem(PROJECT_STEP_KEY);
  return savedStep ? parseInt(savedStep, 10) : null;
};

/**
 * Clears all project form data from localStorage
 */
export const clearProjectFormData = (): void => {
  localStorage.removeItem(PROJECT_FORM_KEY);
  localStorage.removeItem(PROJECT_STEP_KEY);
};

