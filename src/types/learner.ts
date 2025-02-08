
import { TradeType, SkillLevel } from './project';

export interface LearnerPortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  date: Date;
}

export interface LearnerCertification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expiryDate?: Date;
  verificationUrl?: string;
}

export interface Learner {
  id: string;
  // Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  profileImage?: string;
  
  // Location
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Skills & Experience
  tradeSkills: TradeType[];
  skillLevel: SkillLevel;
  yearsOfExperience: number;
  specializations: string[];
  certifications: LearnerCertification[];
  
  // Portfolio
  portfolio: LearnerPortfolioItem[];
  
  // Preferences
  availableForWork: boolean;
  preferredLocationType: ('On-site' | 'Remote' | 'Hybrid')[];
  preferredTradeTypes: TradeType[];
  
  // Account Settings
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    projectAlerts: boolean;
    messageAlerts: boolean;
  };
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

