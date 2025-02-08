
export interface Employer {
  id: string;
  // Company Details
  companyName: string;
  industry: string;
  companySize: string;
  description: string;
  logo?: string;
  website?: string;
  
  // Contact Information
  primaryContact: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Account Settings
  accountSettings: {
    notificationPreferences: {
      email: boolean;
      sms: boolean;
      applicationUpdates: boolean;
      messageAlerts: boolean;
    };
    linkedAccounts: {
      linkedin?: string;
    };
    twoFactorEnabled: boolean;
  };
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

