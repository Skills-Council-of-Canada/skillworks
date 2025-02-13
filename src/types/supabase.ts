
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
    };
  };
}
