
import { TradeType, SkillLevel } from './project';

export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  projectId: string;
  applicantId: string;
  applicantName: string;
  tradeSkills: TradeType[];
  skillLevel: SkillLevel;
  applicationDate: Date;
  status: ApplicationStatus;
  coverLetter?: string;
}

export interface ApplicantProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  tradeSkills: TradeType[];
  skillLevel: SkillLevel;
  certifications: string[];
  experience: number;
  portfolio: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  ratings?: {
    rating: number;
    comment: string;
    reviewerName: string;
    date: Date;
  }[];
}
