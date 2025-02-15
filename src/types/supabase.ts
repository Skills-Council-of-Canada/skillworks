
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      participant_settings: {
        Row: {
          id: string;
          participant_id: string;
          mentorship_mode: "self_guided" | "mentor_assisted";
          privacy_settings: Json;
          notification_preferences: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          participant_id: string;
          mentorship_mode?: "self_guided" | "mentor_assisted";
          privacy_settings?: Json;
          notification_preferences?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      participant_profiles: {
        Row: {
          id: string;
          onboarding_completed: boolean;
          email_verified: boolean;
          location: string | null;
          avatar_url: string | null;
          interests: string[] | null;
          skills: string[] | null;
          bio: string | null;
          certifications: string[] | null;
          created_at: string;
          updated_at: string;
          profile_completion_percentage: number;
          skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
          availability: string;
          date_of_birth: string | null;
          educational_background: string | null;
          preferred_learning_areas: string[];
        };
        Insert: {
          id: string;
          onboarding_completed?: boolean;
          email_verified?: boolean;
          location?: string | null;
          avatar_url?: string | null;
          interests?: string[] | null;
          skills?: string[] | null;
          bio?: string | null;
          certifications?: string[] | null;
          created_at?: string;
          updated_at?: string;
          profile_completion_percentage?: number;
          skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
          availability?: string;
          date_of_birth?: string | null;
          educational_background?: string | null;
          preferred_learning_areas?: string[];
        };
        Update: {
          id?: string;
          onboarding_completed?: boolean;
          email_verified?: boolean;
          location?: string | null;
          avatar_url?: string | null;
          interests?: string[] | null;
          skills?: string[] | null;
          bio?: string | null;
          certifications?: string[] | null;
          created_at?: string;
          updated_at?: string;
          profile_completion_percentage?: number;
          skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
          availability?: string;
          date_of_birth?: string | null;
          educational_background?: string | null;
          preferred_learning_areas?: string[];
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          status: string;
          phone: string | null;
          preferred_contact: string | null;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string;
          phone?: string | null;
          preferred_contact?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          status?: string;
          phone?: string | null;
          preferred_contact?: string | null;
        };
      };
    };
  };
}
