
export type TradeType = 'Electrical' | 'Plumbing' | 'Carpentry' | 'HVAC' | 'Other';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type LocationType = 'On-site' | 'Remote' | 'Hybrid';

export interface ProjectFormData {
  // Project ID
  id?: string;

  // Step 1: Basic Information
  title: string;
  description: string;

  // Step 2: Trade Details
  tradeType: TradeType;
  subcategories: string[];
  skillLevel: SkillLevel;

  // Step 3: Project Specifications
  startDate: Date;
  endDate: Date;
  locationType: LocationType;
  address?: string;
  positions: number;

  // Step 4: Learner Requirements
  certifications: string[];
  toolsProvided: boolean;
  safetyRequirements: string[];

  // Step 5: Media
  images: File[];
  documents: File[];
}
