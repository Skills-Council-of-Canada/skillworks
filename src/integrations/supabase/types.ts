export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          applicant_id: string
          cover_letter: string | null
          created_at: string
          id: string
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          applicant_id: string
          cover_letter?: string | null
          created_at?: string
          id?: string
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          applicant_id?: string
          cover_letter?: string | null
          created_at?: string
          id?: string
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      educator_events: {
        Row: {
          created_at: string
          description: string
          educator_id: string
          event_date: string
          id: string
          location: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          educator_id: string
          event_date: string
          id?: string
          location?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          educator_id?: string
          event_date?: string
          id?: string
          location?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "educator_events_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      educator_experiences: {
        Row: {
          created_at: string
          description: string
          duration_weeks: number
          educator_id: string
          employer_approved: boolean | null
          employer_id: string | null
          end_date: string | null
          id: string
          required_certifications: string[] | null
          skill_level: string
          start_date: string
          status: string
          title: string
          trade_category: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          duration_weeks?: number
          educator_id: string
          employer_approved?: boolean | null
          employer_id?: string | null
          end_date?: string | null
          id?: string
          required_certifications?: string[] | null
          skill_level?: string
          start_date: string
          status?: string
          title: string
          trade_category?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          duration_weeks?: number
          educator_id?: string
          employer_approved?: boolean | null
          employer_id?: string | null
          end_date?: string | null
          id?: string
          required_certifications?: string[] | null
          skill_level?: string
          start_date?: string
          status?: string
          title?: string
          trade_category?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "educator_experiences_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educator_experiences_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      educator_profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          institution_name: string
          phone_number: string | null
          preferred_contact: string
          specialization: string
          updated_at: string
          years_experience: number
        }
        Insert: {
          created_at?: string
          full_name: string
          id: string
          institution_name: string
          phone_number?: string | null
          preferred_contact: string
          specialization: string
          updated_at?: string
          years_experience: number
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          institution_name?: string
          phone_number?: string | null
          preferred_contact?: string
          specialization?: string
          updated_at?: string
          years_experience?: number
        }
        Relationships: []
      }
      educator_tasks: {
        Row: {
          created_at: string
          description: string
          due_date: string | null
          educator_id: string
          id: string
          priority: string
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          due_date?: string | null
          educator_id: string
          id?: string
          priority?: string
          status?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          due_date?: string | null
          educator_id?: string
          id?: string
          priority?: string
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "educator_tasks_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employers: {
        Row: {
          company_name: string
          company_size: string
          created_at: string
          description: string | null
          id: string
          industry: string
          location: string
          logo_url: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone: string
          registration_status: string
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          company_name: string
          company_size: string
          created_at?: string
          description?: string | null
          id?: string
          industry: string
          location: string
          logo_url?: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone: string
          registration_status?: string
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          company_name?: string
          company_size?: string
          created_at?: string
          description?: string | null
          id?: string
          industry?: string
          location?: string
          logo_url?: string | null
          primary_contact_email?: string
          primary_contact_name?: string
          primary_contact_phone?: string
          registration_status?: string
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      experience_assignments: {
        Row: {
          assigned_at: string
          created_at: string
          experience_id: string
          id: string
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          assigned_at?: string
          created_at?: string
          experience_id: string
          id?: string
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          assigned_at?: string
          created_at?: string
          experience_id?: string
          id?: string
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_assignments_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_milestones: {
        Row: {
          created_at: string
          description: string | null
          due_date: string
          experience_id: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date: string
          experience_id: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string
          experience_id?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_milestones_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name?: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_media: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_type: string
          id: string
          project_id: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_type: string
          id?: string
          project_id: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_type?: string
          id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string
          employer_id: string
          end_date: string
          flexibility: string | null
          id: string
          location_type: string
          positions: number
          safety_requirements: string[] | null
          site_address: string | null
          skill_level: string
          start_date: string
          status: string
          title: string
          trade_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          employer_id: string
          end_date: string
          flexibility?: string | null
          id?: string
          location_type: string
          positions: number
          safety_requirements?: string[] | null
          site_address?: string | null
          skill_level: string
          start_date: string
          status?: string
          title: string
          trade_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          employer_id?: string
          end_date?: string
          flexibility?: string | null
          id?: string
          location_type?: string
          positions?: number
          safety_requirements?: string[] | null
          site_address?: string | null
          skill_level?: string
          start_date?: string
          status?: string
          title?: string
          trade_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
