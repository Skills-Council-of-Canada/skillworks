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
      admin_approvals: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          registration_type: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["registration_status"] | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          registration_type: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["registration_status"] | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          registration_type?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["registration_status"] | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_audit_logs: {
        Row: {
          action_type: string
          admin_id: string
          changes: Json | null
          created_at: string
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
        }
        Insert: {
          action_type: string
          admin_id: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
        }
        Update: {
          action_type?: string
          admin_id?: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
        }
        Relationships: []
      }
      admin_experience_reviews: {
        Row: {
          admin_id: string
          created_at: string
          experience_id: string
          feedback: string | null
          id: string
          status: Database["public"]["Enums"]["experience_approval_status"]
        }
        Insert: {
          admin_id: string
          created_at?: string
          experience_id: string
          feedback?: string | null
          id?: string
          status: Database["public"]["Enums"]["experience_approval_status"]
        }
        Update: {
          admin_id?: string
          created_at?: string
          experience_id?: string
          feedback?: string | null
          id?: string
          status?: Database["public"]["Enums"]["experience_approval_status"]
        }
        Relationships: [
          {
            foreignKeyName: "admin_experience_reviews_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "admin_experience_reviews_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_permissions: {
        Row: {
          can_create: boolean | null
          can_delete: boolean | null
          can_read: boolean | null
          can_update: boolean | null
          created_at: string
          id: string
          permission_type: string
          resource_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_read?: boolean | null
          can_update?: boolean | null
          created_at?: string
          id?: string
          permission_type: string
          resource_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_read?: boolean | null
          can_update?: boolean | null
          created_at?: string
          id?: string
          permission_type?: string
          resource_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_role_permissions: {
        Row: {
          admin_id: string
          created_at: string
          id: string
          permission_level: Database["public"]["Enums"]["admin_permission_level"]
          resource_type: Database["public"]["Enums"]["admin_resource_type"]
          updated_at: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          id?: string
          permission_level: Database["public"]["Enums"]["admin_permission_level"]
          resource_type: Database["public"]["Enums"]["admin_resource_type"]
          updated_at?: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          id?: string
          permission_level?: Database["public"]["Enums"]["admin_permission_level"]
          resource_type?: Database["public"]["Enums"]["admin_resource_type"]
          updated_at?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          applicant_id: string
          cover_letter: string | null
          created_at: string
          employer_id: string | null
          id: string
          last_message: string | null
          last_message_at: string | null
          learner_id: string | null
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          applicant_id: string
          cover_letter?: string | null
          created_at?: string
          employer_id?: string | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          learner_id?: string | null
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          applicant_id?: string
          cover_letter?: string | null
          created_at?: string
          employer_id?: string | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          learner_id?: string | null
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
          {
            foreignKeyName: "fk_applications_employer"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_applications_learner"
            columns: ["learner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_members: {
        Row: {
          chat_id: string | null
          id: string
          joined_at: string | null
          permissions: Json | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          chat_id?: string | null
          id?: string
          joined_at?: string | null
          permissions?: Json | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          chat_id?: string | null
          id?: string
          joined_at?: string | null
          permissions?: Json | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_members_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_notifications: {
        Row: {
          chat_id: string | null
          content: string | null
          created_at: string | null
          id: string
          message_id: string | null
          status: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          chat_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          message_id?: string | null
          status?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          chat_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          message_id?: string | null
          status?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_notifications_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_notifications_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_requests: {
        Row: {
          auto_approved: boolean | null
          created_at: string | null
          id: string
          organization_id: string | null
          project_id: string | null
          receiver_id: string | null
          sender_id: string | null
          status: Database["public"]["Enums"]["chat_request_status"] | null
          updated_at: string | null
        }
        Insert: {
          auto_approved?: boolean | null
          created_at?: string | null
          id?: string
          organization_id?: string | null
          project_id?: string | null
          receiver_id?: string | null
          sender_id?: string | null
          status?: Database["public"]["Enums"]["chat_request_status"] | null
          updated_at?: string | null
        }
        Update: {
          auto_approved?: boolean | null
          created_at?: string | null
          id?: string
          organization_id?: string | null
          project_id?: string | null
          receiver_id?: string | null
          sender_id?: string | null
          status?: Database["public"]["Enums"]["chat_request_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_requests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          admin_id: string | null
          created_at: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chats: {
        Row: {
          chat_name: string | null
          created_at: string | null
          id: string
          is_group_chat: boolean | null
          last_message: string | null
          last_message_at: string | null
          organization_id: string | null
          project_id: string | null
          settings: Json | null
          updated_at: string | null
          user_1_id: string | null
          user_2_id: string | null
        }
        Insert: {
          chat_name?: string | null
          created_at?: string | null
          id?: string
          is_group_chat?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          organization_id?: string | null
          project_id?: string | null
          settings?: Json | null
          updated_at?: string | null
          user_1_id?: string | null
          user_2_id?: string | null
        }
        Update: {
          chat_name?: string | null
          created_at?: string | null
          id?: string
          is_group_chat?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          organization_id?: string | null
          project_id?: string | null
          settings?: Json | null
          updated_at?: string | null
          user_1_id?: string | null
          user_2_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      collaboration_messages: {
        Row: {
          collaboration_id: string
          content: string
          created_at: string
          id: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          collaboration_id: string
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          collaboration_id?: string
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collaboration_messages_collaboration_id_fkey"
            columns: ["collaboration_id"]
            isOneToOne: false
            referencedRelation: "educator_employer_collaborations"
            referencedColumns: ["id"]
          },
        ]
      }
      educational_portals: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_restricted: boolean | null
          location: string | null
          name: string
          organization_name: string
          prerequisites: Json | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_restricted?: boolean | null
          location?: string | null
          name: string
          organization_name: string
          prerequisites?: Json | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_restricted?: boolean | null
          location?: string | null
          name?: string
          organization_name?: string
          prerequisites?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      educator_employer_collaborations: {
        Row: {
          created_at: string
          educator_id: string
          employer_id: string
          id: string
          message: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          educator_id: string
          employer_id: string
          id?: string
          message?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          educator_id?: string
          employer_id?: string
          id?: string
          message?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "educator_employer_collaborations_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
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
          admin_feedback: string | null
          admin_notes: string | null
          approval_status:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
          class_size: number | null
          company_preferences: Json | null
          company_types: string[] | null
          compensation_type: string | null
          created_at: string
          description: string
          duration_weeks: number
          educator_id: string
          employer_approved: boolean | null
          employer_id: string | null
          end_date: string | null
          example_projects: Json[] | null
          expected_outcomes: string[] | null
          id: string
          is_published: boolean
          is_template: boolean | null
          last_saved_at: string | null
          learner_count: number | null
          learner_requirements: string[] | null
          marketplace_visibility: string
          meta_objectives: string[] | null
          meta_outcomes: string[] | null
          meta_prerequisites: string[] | null
          milestones: string[] | null
          preferred_company_size: string | null
          preferred_industries: string[] | null
          published_at: string | null
          required_certifications: string[] | null
          reviewed_at: string | null
          reviewed_by: string | null
          screening_questions: Json[] | null
          skill_level: string
          skill_tags: string[] | null
          start_date: string
          status: Database["public"]["Enums"]["experience_status"] | null
          subcategories: string[] | null
          team_size: number | null
          template_id: string | null
          timeline_end_date: string | null
          timeline_start_date: string | null
          title: string
          trade_category: string
          unique_code: string | null
          updated_at: string
          visibility: string
          workflow_status: string
        }
        Insert: {
          admin_feedback?: string | null
          admin_notes?: string | null
          approval_status?:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
          class_size?: number | null
          company_preferences?: Json | null
          company_types?: string[] | null
          compensation_type?: string | null
          created_at?: string
          description: string
          duration_weeks?: number
          educator_id: string
          employer_approved?: boolean | null
          employer_id?: string | null
          end_date?: string | null
          example_projects?: Json[] | null
          expected_outcomes?: string[] | null
          id?: string
          is_published?: boolean
          is_template?: boolean | null
          last_saved_at?: string | null
          learner_count?: number | null
          learner_requirements?: string[] | null
          marketplace_visibility?: string
          meta_objectives?: string[] | null
          meta_outcomes?: string[] | null
          meta_prerequisites?: string[] | null
          milestones?: string[] | null
          preferred_company_size?: string | null
          preferred_industries?: string[] | null
          published_at?: string | null
          required_certifications?: string[] | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screening_questions?: Json[] | null
          skill_level?: string
          skill_tags?: string[] | null
          start_date: string
          status?: Database["public"]["Enums"]["experience_status"] | null
          subcategories?: string[] | null
          team_size?: number | null
          template_id?: string | null
          timeline_end_date?: string | null
          timeline_start_date?: string | null
          title: string
          trade_category?: string
          unique_code?: string | null
          updated_at?: string
          visibility?: string
          workflow_status?: string
        }
        Update: {
          admin_feedback?: string | null
          admin_notes?: string | null
          approval_status?:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
          class_size?: number | null
          company_preferences?: Json | null
          company_types?: string[] | null
          compensation_type?: string | null
          created_at?: string
          description?: string
          duration_weeks?: number
          educator_id?: string
          employer_approved?: boolean | null
          employer_id?: string | null
          end_date?: string | null
          example_projects?: Json[] | null
          expected_outcomes?: string[] | null
          id?: string
          is_published?: boolean
          is_template?: boolean | null
          last_saved_at?: string | null
          learner_count?: number | null
          learner_requirements?: string[] | null
          marketplace_visibility?: string
          meta_objectives?: string[] | null
          meta_outcomes?: string[] | null
          meta_prerequisites?: string[] | null
          milestones?: string[] | null
          preferred_company_size?: string | null
          preferred_industries?: string[] | null
          published_at?: string | null
          required_certifications?: string[] | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          screening_questions?: Json[] | null
          skill_level?: string
          skill_tags?: string[] | null
          start_date?: string
          status?: Database["public"]["Enums"]["experience_status"] | null
          subcategories?: string[] | null
          team_size?: number | null
          template_id?: string | null
          timeline_end_date?: string | null
          timeline_start_date?: string | null
          title?: string
          trade_category?: string
          unique_code?: string | null
          updated_at?: string
          visibility?: string
          workflow_status?: string
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
          {
            foreignKeyName: "educator_experiences_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "educator_experiences_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      educator_profiles: {
        Row: {
          areas_of_interest: string[] | null
          completed_onboarding: boolean | null
          created_at: string
          full_name: string
          id: string
          institution_name: string
          job_title: string | null
          location: string | null
          phone_number: string | null
          phone_verified_at: string | null
          preferred_contact: string
          sms_verified: boolean | null
          specialization: string
          updated_at: string
          verification_date: string | null
          verified: boolean | null
          years_experience: number
        }
        Insert: {
          areas_of_interest?: string[] | null
          completed_onboarding?: boolean | null
          created_at?: string
          full_name: string
          id: string
          institution_name: string
          job_title?: string | null
          location?: string | null
          phone_number?: string | null
          phone_verified_at?: string | null
          preferred_contact: string
          sms_verified?: boolean | null
          specialization: string
          updated_at?: string
          verification_date?: string | null
          verified?: boolean | null
          years_experience: number
        }
        Update: {
          areas_of_interest?: string[] | null
          completed_onboarding?: boolean | null
          created_at?: string
          full_name?: string
          id?: string
          institution_name?: string
          job_title?: string | null
          location?: string | null
          phone_number?: string | null
          phone_verified_at?: string | null
          preferred_contact?: string
          sms_verified?: boolean | null
          specialization?: string
          updated_at?: string
          verification_date?: string | null
          verified?: boolean | null
          years_experience?: number
        }
        Relationships: []
      }
      educator_registrations: {
        Row: {
          areas_of_interest: string[] | null
          created_at: string
          email: string
          full_name: string
          id: string
          institution_name: string
          job_title: string | null
          location: string | null
          phone_number: string | null
          preferred_contact: string
          registration_completed: boolean | null
          specialization: string
          updated_at: string
          user_id: string | null
          years_experience: number
        }
        Insert: {
          areas_of_interest?: string[] | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          institution_name: string
          job_title?: string | null
          location?: string | null
          phone_number?: string | null
          preferred_contact: string
          registration_completed?: boolean | null
          specialization: string
          updated_at?: string
          user_id?: string | null
          years_experience: number
        }
        Update: {
          areas_of_interest?: string[] | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          institution_name?: string
          job_title?: string | null
          location?: string | null
          phone_number?: string | null
          preferred_contact?: string
          registration_completed?: boolean | null
          specialization?: string
          updated_at?: string
          user_id?: string | null
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
      employer_registrations: {
        Row: {
          company_name: string
          company_size: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string
          id: string
          industry: string
          location: string
          registration_completed: boolean | null
          updated_at: string
          user_id: string | null
          username: string
        }
        Insert: {
          company_name: string
          company_size: string
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string
          id?: string
          industry: string
          location: string
          registration_completed?: boolean | null
          updated_at?: string
          user_id?: string | null
          username: string
        }
        Update: {
          company_name?: string
          company_size?: string
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          id?: string
          industry?: string
          location?: string
          registration_completed?: boolean | null
          updated_at?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      employer_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          educator_id: string
          employer_id: string
          id: string
          rating: number
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          educator_id: string
          employer_id: string
          id?: string
          rating: number
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          educator_id?: string
          employer_id?: string
          id?: string
          rating?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employer_reviews_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_reviews_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      employers: {
        Row: {
          admin_review_date: string | null
          admin_review_notes: string | null
          admin_reviewer_id: string | null
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
          rating: number | null
          rating_count: number | null
          registration_status: string
          rejection_reason: string | null
          updated_at: string
          user_id: string
          verification_status:
            | Database["public"]["Enums"]["employer_verification_status"]
            | null
          verification_submitted_at: string | null
          verification_token: string | null
          verification_token_expires_at: string | null
          verified: boolean | null
          website: string | null
        }
        Insert: {
          admin_review_date?: string | null
          admin_review_notes?: string | null
          admin_reviewer_id?: string | null
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
          rating?: number | null
          rating_count?: number | null
          registration_status?: string
          rejection_reason?: string | null
          updated_at?: string
          user_id: string
          verification_status?:
            | Database["public"]["Enums"]["employer_verification_status"]
            | null
          verification_submitted_at?: string | null
          verification_token?: string | null
          verification_token_expires_at?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          admin_review_date?: string | null
          admin_review_notes?: string | null
          admin_reviewer_id?: string | null
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
          rating?: number | null
          rating_count?: number | null
          registration_status?: string
          rejection_reason?: string | null
          updated_at?: string
          user_id?: string
          verification_status?:
            | Database["public"]["Enums"]["employer_verification_status"]
            | null
          verification_submitted_at?: string | null
          verification_token?: string | null
          verification_token_expires_at?: string | null
          verified?: boolean | null
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
          last_activity_at: string | null
          participation_metrics: Json | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          assigned_at?: string
          created_at?: string
          experience_id: string
          id?: string
          last_activity_at?: string | null
          participation_metrics?: Json | null
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          assigned_at?: string
          created_at?: string
          experience_id?: string
          id?: string
          last_activity_at?: string | null
          participation_metrics?: Json | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_assignments_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_assignments_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_experience_assignments_student"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_co_educators: {
        Row: {
          created_at: string
          educator_id: string
          experience_id: string
          id: string
          permissions: Json | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          educator_id: string
          experience_id: string
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          educator_id?: string
          experience_id?: string
          id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_co_educators_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_co_educators_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_co_educators_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_drafts: {
        Row: {
          created_at: string
          current_step: string
          description: string | null
          educator_id: string
          example_projects: Json[] | null
          expected_outcomes: string[] | null
          id: string
          last_saved_at: string
          media_files: Json[] | null
          status: Database["public"]["Enums"]["experience_draft_status"] | null
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_step?: string
          description?: string | null
          educator_id: string
          example_projects?: Json[] | null
          expected_outcomes?: string[] | null
          id?: string
          last_saved_at?: string
          media_files?: Json[] | null
          status?: Database["public"]["Enums"]["experience_draft_status"] | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_step?: string
          description?: string | null
          educator_id?: string
          example_projects?: Json[] | null
          expected_outcomes?: string[] | null
          id?: string
          last_saved_at?: string
          media_files?: Json[] | null
          status?: Database["public"]["Enums"]["experience_draft_status"] | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      experience_feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          participant_experience_id: string | null
          rating: number
          reviewer_id: string | null
          reviewer_profile_id: string | null
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          participant_experience_id?: string | null
          rating: number
          reviewer_id?: string | null
          reviewer_profile_id?: string | null
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          participant_experience_id?: string | null
          rating?: number
          reviewer_id?: string | null
          reviewer_profile_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_feedback_participant_experience_id_fkey"
            columns: ["participant_experience_id"]
            isOneToOne: false
            referencedRelation: "participant_experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_feedback_reviewer_profile_id_fkey"
            columns: ["reviewer_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_matches: {
        Row: {
          created_at: string
          educator_notes: string | null
          employer_id: string
          employer_notes: string | null
          experience_id: string
          id: string
          match_criteria: Json | null
          match_score: number | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          educator_notes?: string | null
          employer_id: string
          employer_notes?: string | null
          experience_id: string
          id?: string
          match_criteria?: Json | null
          match_score?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          educator_notes?: string | null
          employer_id?: string
          employer_notes?: string | null
          experience_id?: string
          id?: string
          match_criteria?: Json | null
          match_score?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_matches_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_matches_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_matches_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_media: {
        Row: {
          created_at: string
          experience_id: string
          file_name: string
          file_path: string
          file_type: string
          id: string
        }
        Insert: {
          created_at?: string
          experience_id: string
          file_name: string
          file_path: string
          file_type: string
          id?: string
        }
        Update: {
          created_at?: string
          experience_id?: string
          file_name?: string
          file_path?: string
          file_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_media_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_media_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_messages: {
        Row: {
          created_at: string | null
          experience_id: string
          id: string
          is_read: boolean | null
          message: string
          sender_id: string
        }
        Insert: {
          created_at?: string | null
          experience_id: string
          id?: string
          is_read?: boolean | null
          message: string
          sender_id: string
        }
        Update: {
          created_at?: string | null
          experience_id?: string
          id?: string
          is_read?: boolean | null
          message?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_messages_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "participant_experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_experience_id"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "participant_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_milestone_attachments: {
        Row: {
          created_at: string
          file_name: string
          file_type: string
          file_url: string
          id: string
          milestone_id: string | null
        }
        Insert: {
          created_at?: string
          file_name: string
          file_type: string
          file_url: string
          id?: string
          milestone_id?: string | null
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          milestone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_milestone_attachments_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "experience_milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_milestones: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string
          id: string
          participant_experience_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date: string
          id?: string
          participant_experience_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string
          id?: string
          participant_experience_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_milestones_participant_experience_id_fkey"
            columns: ["participant_experience_id"]
            isOneToOne: false
            referencedRelation: "participant_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_prerequisites: {
        Row: {
          created_at: string | null
          description: string | null
          experience_id: string | null
          id: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          experience_id?: string | null
          id?: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          experience_id?: string | null
          id?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_prerequisites_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_prerequisites_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_requests: {
        Row: {
          created_at: string
          employer_id: string
          experience_id: string
          id: string
          message: string | null
          requested_modifications: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          employer_id: string
          experience_id: string
          id?: string
          message?: string | null
          requested_modifications?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          employer_id?: string
          experience_id?: string
          id?: string
          message?: string | null
          requested_modifications?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_requests_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_requests_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_requests_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_screening_questions: {
        Row: {
          created_at: string
          experience_id: string | null
          id: string
          options: Json | null
          question: string
          question_type: string | null
          required: boolean | null
        }
        Insert: {
          created_at?: string
          experience_id?: string | null
          id?: string
          options?: Json | null
          question: string
          question_type?: string | null
          required?: boolean | null
        }
        Update: {
          created_at?: string
          experience_id?: string | null
          id?: string
          options?: Json | null
          question?: string
          question_type?: string | null
          required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_screening_questions_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "participant_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_settings: {
        Row: {
          access_control: Json | null
          auto_approve_requests: boolean | null
          communication_settings: Json | null
          created_at: string
          display_preferences: Json | null
          experience_id: string
          id: string
          notification_preferences: Json | null
          updated_at: string
          visibility_settings: Json | null
        }
        Insert: {
          access_control?: Json | null
          auto_approve_requests?: boolean | null
          communication_settings?: Json | null
          created_at?: string
          display_preferences?: Json | null
          experience_id: string
          id?: string
          notification_preferences?: Json | null
          updated_at?: string
          visibility_settings?: Json | null
        }
        Update: {
          access_control?: Json | null
          auto_approve_requests?: boolean | null
          communication_settings?: Json | null
          created_at?: string
          display_preferences?: Json | null
          experience_id?: string
          id?: string
          notification_preferences?: Json | null
          updated_at?: string
          visibility_settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_settings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: true
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_settings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: true
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_status_changes: {
        Row: {
          admin_id: string
          created_at: string
          experience_id: string
          feedback: string | null
          id: string
          new_status: Database["public"]["Enums"]["experience_approval_status"]
          old_status:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
        }
        Insert: {
          admin_id: string
          created_at?: string
          experience_id: string
          feedback?: string | null
          id?: string
          new_status: Database["public"]["Enums"]["experience_approval_status"]
          old_status?:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
        }
        Update: {
          admin_id?: string
          created_at?: string
          experience_id?: string
          feedback?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["experience_approval_status"]
          old_status?:
            | Database["public"]["Enums"]["experience_approval_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_status_changes_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_status_changes_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_team_members: {
        Row: {
          created_at: string
          id: string
          joined_at: string
          role: string | null
          student_id: string
          team_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          joined_at?: string
          role?: string | null
          student_id: string
          team_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          joined_at?: string
          role?: string | null
          student_id?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_team_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "experience_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_teams: {
        Row: {
          created_at: string
          description: string | null
          experience_id: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          experience_id: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          experience_id?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_teams_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_teams_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_templates: {
        Row: {
          created_at: string | null
          description: string
          educator_id: string | null
          experience_id: string | null
          id: string
          is_public: boolean | null
          metadata: Json | null
          skill_level: string
          status: string | null
          title: string
          trade_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          educator_id?: string | null
          experience_id?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          skill_level: string
          status?: string | null
          title: string
          trade_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          educator_id?: string | null
          experience_id?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          skill_level?: string
          status?: string | null
          title?: string
          trade_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_educator"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_experience"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "fk_experience"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_updates: {
        Row: {
          author_id: string
          content: string
          created_at: string
          experience_id: string
          id: string
          media_urls: string[] | null
          title: string
          updated_at: string
          visibility: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          experience_id: string
          id?: string
          media_urls?: string[] | null
          title: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          experience_id?: string
          id?: string
          media_urls?: string[] | null
          title?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_updates_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "experience_updates_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_experience_updates_author"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_chat_members: {
        Row: {
          group_chat_id: string | null
          id: string
          joined_at: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          group_chat_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string
          user_id?: string | null
        }
        Update: {
          group_chat_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_chat_members_group_chat_id_fkey"
            columns: ["group_chat_id"]
            isOneToOne: false
            referencedRelation: "group_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      group_chats: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_announcement_channel: boolean | null
          name: string
          project_id: string | null
          school_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_announcement_channel?: boolean | null
          name: string
          project_id?: string | null
          school_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_announcement_channel?: boolean | null
          name?: string
          project_id?: string | null
          school_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_chats_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      industries: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      knowledge_base_articles: {
        Row: {
          category: string
          content: string
          created_at: string
          created_by: string
          id: string
          is_published: boolean
          tags: string[] | null
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          created_by: string
          id?: string
          is_published?: boolean
          tags?: string[] | null
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          is_published?: boolean
          tags?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: []
      }
      mentor_feedback_requests: {
        Row: {
          created_at: string | null
          description: string
          id: string
          participant_id: string
          relationship_id: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          participant_id: string
          relationship_id: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          participant_id?: string
          relationship_id?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_relationship"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "mentor_relationships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_feedback_requests_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "mentor_relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          relationship_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          relationship_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          relationship_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_relationship"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "mentor_relationships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_messages_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "mentor_relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_relationships: {
        Row: {
          created_at: string | null
          id: string
          mentor_id: string
          participant_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mentor_id: string
          participant_id: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mentor_id?: string
          participant_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mentor_skill_assessments: {
        Row: {
          created_at: string | null
          current_level: number
          id: string
          next_assessment_date: string
          notes: string | null
          relationship_id: string
          skill_name: string
          target_level: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_level: number
          id?: string
          next_assessment_date: string
          notes?: string | null
          relationship_id: string
          skill_name: string
          target_level: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_level?: number
          id?: string
          next_assessment_date?: string
          notes?: string | null
          relationship_id?: string
          skill_name?: string
          target_level?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_relationship"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "mentor_relationships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_skill_assessments_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "mentor_relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      message_attachments: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          message_id: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          message_id?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          application_id: string
          attachments: Json[] | null
          chat_id: string | null
          chat_type: string | null
          content: string
          created_at: string | null
          deleted_at: string | null
          edited_at: string | null
          edited_by: string | null
          encrypted_content: string | null
          encryption_metadata: Json | null
          forwarded_from: string | null
          id: string
          is_edited: boolean | null
          is_pinned: boolean | null
          last_edit_at: string | null
          mentions: Json | null
          reactions: Json[] | null
          read_at: string | null
          recipient_id: string
          reply_to: string | null
          reply_to_id: string | null
          search_vector: unknown | null
          sender_id: string
          status: string | null
          thread_id: string | null
          typing_state: boolean | null
          typing_updated_at: string | null
        }
        Insert: {
          application_id: string
          attachments?: Json[] | null
          chat_id?: string | null
          chat_type?: string | null
          content: string
          created_at?: string | null
          deleted_at?: string | null
          edited_at?: string | null
          edited_by?: string | null
          encrypted_content?: string | null
          encryption_metadata?: Json | null
          forwarded_from?: string | null
          id?: string
          is_edited?: boolean | null
          is_pinned?: boolean | null
          last_edit_at?: string | null
          mentions?: Json | null
          reactions?: Json[] | null
          read_at?: string | null
          recipient_id: string
          reply_to?: string | null
          reply_to_id?: string | null
          search_vector?: unknown | null
          sender_id: string
          status?: string | null
          thread_id?: string | null
          typing_state?: boolean | null
          typing_updated_at?: string | null
        }
        Update: {
          application_id?: string
          attachments?: Json[] | null
          chat_id?: string | null
          chat_type?: string | null
          content?: string
          created_at?: string | null
          deleted_at?: string | null
          edited_at?: string | null
          edited_by?: string | null
          encrypted_content?: string | null
          encryption_metadata?: Json | null
          forwarded_from?: string | null
          id?: string
          is_edited?: boolean | null
          is_pinned?: boolean | null
          last_edit_at?: string | null
          mentions?: Json | null
          reactions?: Json[] | null
          read_at?: string | null
          recipient_id?: string
          reply_to?: string | null
          reply_to_id?: string | null
          search_vector?: unknown | null
          sender_id?: string
          status?: string | null
          thread_id?: string | null
          typing_state?: boolean | null
          typing_updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_edited_by_fkey"
            columns: ["edited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_forwarded_from_fkey"
            columns: ["forwarded_from"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          experience_id: string | null
          id: string
          message: string
          read: boolean | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          message: string
          read?: boolean | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          experience_id?: string | null
          id?: string
          message?: string
          read?: boolean | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "notifications_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_achievements: {
        Row: {
          badge_url: string | null
          created_at: string
          description: string | null
          id: string
          issued_at: string
          issuer: string | null
          metadata: Json | null
          participant_id: string | null
          title: string
          type: string
        }
        Insert: {
          badge_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          issued_at?: string
          issuer?: string | null
          metadata?: Json | null
          participant_id?: string | null
          title: string
          type: string
        }
        Update: {
          badge_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          issued_at?: string
          issuer?: string | null
          metadata?: Json | null
          participant_id?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_achievements_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_education: {
        Row: {
          created_at: string | null
          degree: string
          description: string | null
          end_date: string | null
          field_of_study: string
          id: string
          institution_name: string
          is_current: boolean | null
          participant_id: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          degree: string
          description?: string | null
          end_date?: string | null
          field_of_study: string
          id?: string
          institution_name: string
          is_current?: boolean | null
          participant_id: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          degree?: string
          description?: string | null
          end_date?: string | null
          field_of_study?: string
          id?: string
          institution_name?: string
          is_current?: boolean | null
          participant_id?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_education_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_events: {
        Row: {
          created_at: string | null
          description: string | null
          event_type: string
          id: string
          participant_id: string
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_type: string
          id?: string
          participant_id: string
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_type?: string
          id?: string
          participant_id?: string
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      participant_experiences: {
        Row: {
          assignment_method: string | null
          category_tags: string[] | null
          class_affiliation: boolean | null
          company_types: string[] | null
          compensation_type: string | null
          course_name: string | null
          created_at: string | null
          date_assignment_rule: string | null
          description: string | null
          difficulty_level: string[] | null
          duration_hours: number | null
          educator_id: string | null
          educator_profile_id: string | null
          end_date: string | null
          expected_outcomes: string[] | null
          hours_per_learner: number | null
          id: string
          industry_preferences: string[] | null
          learner_capabilities: string | null
          learner_level: string | null
          location_preference: string | null
          match_request_close_date: string | null
          matches_count: number | null
          max_learners: number | null
          media_urls: string[] | null
          mentor_feedback_status: string | null
          participant_id: string
          preferred_companies: Json | null
          program_type: string | null
          project_examples: Json[] | null
          projects_wanted: number | null
          screening_questions: Json | null
          skill_tags: string[] | null
          start_date: string | null
          status: string
          subcategories: string[] | null
          submission_instructions: string | null
          team_size: number | null
          team_structure: string | null
          title: string
          trade_category: string | null
          updated_at: string | null
          video_url: string | null
          work_structure: string | null
          workflow_status: string | null
        }
        Insert: {
          assignment_method?: string | null
          category_tags?: string[] | null
          class_affiliation?: boolean | null
          company_types?: string[] | null
          compensation_type?: string | null
          course_name?: string | null
          created_at?: string | null
          date_assignment_rule?: string | null
          description?: string | null
          difficulty_level?: string[] | null
          duration_hours?: number | null
          educator_id?: string | null
          educator_profile_id?: string | null
          end_date?: string | null
          expected_outcomes?: string[] | null
          hours_per_learner?: number | null
          id?: string
          industry_preferences?: string[] | null
          learner_capabilities?: string | null
          learner_level?: string | null
          location_preference?: string | null
          match_request_close_date?: string | null
          matches_count?: number | null
          max_learners?: number | null
          media_urls?: string[] | null
          mentor_feedback_status?: string | null
          participant_id: string
          preferred_companies?: Json | null
          program_type?: string | null
          project_examples?: Json[] | null
          projects_wanted?: number | null
          screening_questions?: Json | null
          skill_tags?: string[] | null
          start_date?: string | null
          status?: string
          subcategories?: string[] | null
          submission_instructions?: string | null
          team_size?: number | null
          team_structure?: string | null
          title: string
          trade_category?: string | null
          updated_at?: string | null
          video_url?: string | null
          work_structure?: string | null
          workflow_status?: string | null
        }
        Update: {
          assignment_method?: string | null
          category_tags?: string[] | null
          class_affiliation?: boolean | null
          company_types?: string[] | null
          compensation_type?: string | null
          course_name?: string | null
          created_at?: string | null
          date_assignment_rule?: string | null
          description?: string | null
          difficulty_level?: string[] | null
          duration_hours?: number | null
          educator_id?: string | null
          educator_profile_id?: string | null
          end_date?: string | null
          expected_outcomes?: string[] | null
          hours_per_learner?: number | null
          id?: string
          industry_preferences?: string[] | null
          learner_capabilities?: string | null
          learner_level?: string | null
          location_preference?: string | null
          match_request_close_date?: string | null
          matches_count?: number | null
          max_learners?: number | null
          media_urls?: string[] | null
          mentor_feedback_status?: string | null
          participant_id?: string
          preferred_companies?: Json | null
          program_type?: string | null
          project_examples?: Json[] | null
          projects_wanted?: number | null
          screening_questions?: Json | null
          skill_tags?: string[] | null
          start_date?: string | null
          status?: string
          subcategories?: string[] | null
          submission_instructions?: string | null
          team_size?: number | null
          team_structure?: string | null
          title?: string
          trade_category?: string | null
          updated_at?: string | null
          video_url?: string | null
          work_structure?: string | null
          workflow_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_experiences_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_experiences_educator_profile_id_fkey"
            columns: ["educator_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_integrations: {
        Row: {
          created_at: string | null
          google_calendar_connected: boolean | null
          google_oauth_token: Json | null
          id: string
          linkedin_oauth_token: Json | null
          participant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          google_calendar_connected?: boolean | null
          google_oauth_token?: Json | null
          id?: string
          linkedin_oauth_token?: Json | null
          participant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          google_calendar_connected?: boolean | null
          google_oauth_token?: Json | null
          id?: string
          linkedin_oauth_token?: Json | null
          participant_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      participant_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          participant_id: string
          read: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          participant_id: string
          read?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          participant_id?: string
          read?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      participant_notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          participant_id: string | null
          read: boolean | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          participant_id?: string | null
          read?: boolean | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          participant_id?: string | null
          read?: boolean | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_notifications_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_profile_completion: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean | null
          optional_fields: Json | null
          participant_id: string | null
          required_fields: Json | null
          step_name: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          optional_fields?: Json | null
          participant_id?: string | null
          required_fields?: Json | null
          step_name: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          optional_fields?: Json | null
          participant_id?: string | null
          required_fields?: Json | null
          step_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_profile_completion_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          certifications: Json[] | null
          created_at: string
          email_verified: boolean | null
          id: string
          interests: string[] | null
          location: string | null
          onboarding_completed: boolean | null
          profile_completion_percentage: number | null
          skills: string[] | null
          steps_completed: Json | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          certifications?: Json[] | null
          created_at?: string
          email_verified?: boolean | null
          id: string
          interests?: string[] | null
          location?: string | null
          onboarding_completed?: boolean | null
          profile_completion_percentage?: number | null
          skills?: string[] | null
          steps_completed?: Json | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          certifications?: Json[] | null
          created_at?: string
          email_verified?: boolean | null
          id?: string
          interests?: string[] | null
          location?: string | null
          onboarding_completed?: boolean | null
          profile_completion_percentage?: number | null
          skills?: string[] | null
          steps_completed?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      participant_project_deliverables: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string
          feedback: string | null
          feedback_at: string | null
          feedback_by: string | null
          id: string
          participant_project_id: string
          status: string
          submission_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date: string
          feedback?: string | null
          feedback_at?: string | null
          feedback_by?: string | null
          id?: string
          participant_project_id: string
          status?: string
          submission_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string
          feedback?: string | null
          feedback_at?: string | null
          feedback_by?: string | null
          id?: string
          participant_project_id?: string
          status?: string
          submission_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_project_deliverables_participant_project_id_fkey"
            columns: ["participant_project_id"]
            isOneToOne: false
            referencedRelation: "participant_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_project_documents: {
        Row: {
          created_at: string | null
          file_name: string
          file_type: string
          file_url: string
          id: string
          participant_project_id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_type: string
          file_url: string
          id?: string
          participant_project_id: string
          uploaded_by: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          participant_project_id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_project_documents_participant_project_id_fkey"
            columns: ["participant_project_id"]
            isOneToOne: false
            referencedRelation: "participant_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_project_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          participant_project_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          participant_project_id: string
          sender_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          participant_project_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_project_messages_participant_project_id_fkey"
            columns: ["participant_project_id"]
            isOneToOne: false
            referencedRelation: "participant_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_project_team_members: {
        Row: {
          created_at: string | null
          id: string
          joined_at: string | null
          member_id: string
          participant_project_id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          joined_at?: string | null
          member_id: string
          participant_project_id: string
          role?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          joined_at?: string | null
          member_id?: string
          participant_project_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_project_team_members_participant_project_id_fkey"
            columns: ["participant_project_id"]
            isOneToOne: false
            referencedRelation: "participant_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_projects: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          participant_id: string
          project_id: string
          started_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          participant_id: string
          project_id: string
          started_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          participant_id?: string
          project_id?: string
          started_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_recommendations: {
        Row: {
          created_at: string | null
          experience_id: string
          id: string
          is_viewed: boolean | null
          match_reasons: Json | null
          match_score: number
          participant_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          experience_id: string
          id?: string
          is_viewed?: boolean | null
          match_reasons?: Json | null
          match_score: number
          participant_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          experience_id?: string
          id?: string
          is_viewed?: boolean | null
          match_reasons?: Json | null
          match_score?: number
          participant_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_recommendations_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "participant_recommendations_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_registrations: {
        Row: {
          availability: string
          created_at: string | null
          date_of_birth: string
          educational_background: string | null
          email: string
          email_verified: boolean | null
          first_name: string
          id: string
          last_name: string
          oauth_id: string | null
          oauth_provider: string | null
          preferred_learning_areas: string[] | null
          registration_completed: boolean | null
          skill_level: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          availability: string
          created_at?: string | null
          date_of_birth: string
          educational_background?: string | null
          email: string
          email_verified?: boolean | null
          first_name: string
          id?: string
          last_name: string
          oauth_id?: string | null
          oauth_provider?: string | null
          preferred_learning_areas?: string[] | null
          registration_completed?: boolean | null
          skill_level: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          availability?: string
          created_at?: string | null
          date_of_birth?: string
          educational_background?: string | null
          email?: string
          email_verified?: boolean | null
          first_name?: string
          id?: string
          last_name?: string
          oauth_id?: string | null
          oauth_provider?: string | null
          preferred_learning_areas?: string[] | null
          registration_completed?: boolean | null
          skill_level?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      participant_settings: {
        Row: {
          appearance_settings: Json | null
          created_at: string
          digest_settings: Json | null
          id: string
          language_preference: string | null
          mentorship_mode: Database["public"]["Enums"]["mentorship_mode_type"]
          notification_preferences: Json
          participant_id: string
          privacy_settings: Json
          security_settings: Json | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          appearance_settings?: Json | null
          created_at?: string
          digest_settings?: Json | null
          id?: string
          language_preference?: string | null
          mentorship_mode?: Database["public"]["Enums"]["mentorship_mode_type"]
          notification_preferences?: Json
          participant_id: string
          privacy_settings?: Json
          security_settings?: Json | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          appearance_settings?: Json | null
          created_at?: string
          digest_settings?: Json | null
          id?: string
          language_preference?: string | null
          mentorship_mode?: Database["public"]["Enums"]["mentorship_mode_type"]
          notification_preferences?: Json
          participant_id?: string
          privacy_settings?: Json
          security_settings?: Json | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      participant_tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          experience_id: string | null
          id: string
          participant_id: string
          priority: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          experience_id?: string | null
          id?: string
          participant_id: string
          priority?: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          experience_id?: string | null
          id?: string
          participant_id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_tasks_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "participant_tasks_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_work_experience: {
        Row: {
          company_name: string
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          location: string | null
          participant_id: string
          position: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          participant_id: string
          position: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          location?: string | null
          participant_id?: string
          position?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_work_experience_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_workflow_status: {
        Row: {
          created_at: string | null
          id: string
          last_status_change: string | null
          needs_admin_review: boolean | null
          participant_id: string
          registration_status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_status_change?: string | null
          needs_admin_review?: boolean | null
          participant_id: string
          registration_status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_status_change?: string | null
          needs_admin_review?: boolean | null
          participant_id?: string
          registration_status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          id: string
          name: string
          online_status: boolean | null
          phone: string | null
          preferred_contact: string | null
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          online_status?: boolean | null
          phone?: string | null
          preferred_contact?: string | null
          role: string
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          online_status?: boolean | null
          phone?: string | null
          preferred_contact?: string | null
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_approvals: {
        Row: {
          admin_id: string | null
          created_at: string | null
          feedback: string | null
          id: string
          project_id: string | null
          status: Database["public"]["Enums"]["project_review_status"]
          updated_at: string | null
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          project_id?: string | null
          status: Database["public"]["Enums"]["project_review_status"]
          updated_at?: string | null
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: string
          project_id?: string | null
          status?: Database["public"]["Enums"]["project_review_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_approvals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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
      project_reviews: {
        Row: {
          created_at: string
          feedback: string | null
          id: string
          project_id: string
          reviewer_id: string
          status: Database["public"]["Enums"]["project_review_status"]
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          id?: string
          project_id: string
          reviewer_id: string
          status: Database["public"]["Enums"]["project_review_status"]
        }
        Update: {
          created_at?: string
          feedback?: string | null
          id?: string
          project_id?: string
          reviewer_id?: string
          status?: Database["public"]["Enums"]["project_review_status"]
        }
        Relationships: [
          {
            foreignKeyName: "project_reviews_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_status_changes: {
        Row: {
          admin_id: string
          created_at: string
          feedback: string | null
          id: string
          new_status: Database["public"]["Enums"]["project_review_status"]
          old_status:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          project_id: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          feedback?: string | null
          id?: string
          new_status: Database["public"]["Enums"]["project_review_status"]
          old_status?:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          project_id: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          feedback?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["project_review_status"]
          old_status?:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_status_changes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          admin_feedback: string | null
          approval_notes: string | null
          auto_assign_enabled: boolean | null
          certifications_required: string[] | null
          created_at: string
          description: string
          employer_id: string
          end_date: string
          flexibility: string | null
          id: string
          industry: string | null
          location_type: string
          match_history: Json | null
          max_participants: number | null
          modification_requested: string | null
          positions: number
          project_type: string | null
          review_status:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          reviewed_at: string | null
          reviewed_by: string | null
          safety_requirements: string[] | null
          search_vector: unknown | null
          site_address: string | null
          skill_level: string
          start_date: string
          status: string
          template_id: string | null
          title: string
          trade_type: string
          updated_at: string
          visibility: Database["public"]["Enums"]["project_visibility"] | null
        }
        Insert: {
          admin_feedback?: string | null
          approval_notes?: string | null
          auto_assign_enabled?: boolean | null
          certifications_required?: string[] | null
          created_at?: string
          description: string
          employer_id: string
          end_date: string
          flexibility?: string | null
          id?: string
          industry?: string | null
          location_type: string
          match_history?: Json | null
          max_participants?: number | null
          modification_requested?: string | null
          positions: number
          project_type?: string | null
          review_status?:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          safety_requirements?: string[] | null
          search_vector?: unknown | null
          site_address?: string | null
          skill_level: string
          start_date: string
          status?: string
          template_id?: string | null
          title: string
          trade_type: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["project_visibility"] | null
        }
        Update: {
          admin_feedback?: string | null
          approval_notes?: string | null
          auto_assign_enabled?: boolean | null
          certifications_required?: string[] | null
          created_at?: string
          description?: string
          employer_id?: string
          end_date?: string
          flexibility?: string | null
          id?: string
          industry?: string | null
          location_type?: string
          match_history?: Json | null
          max_participants?: number | null
          modification_requested?: string | null
          positions?: number
          project_type?: string | null
          review_status?:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          safety_requirements?: string[] | null
          search_vector?: unknown | null
          site_address?: string | null
          skill_level?: string
          start_date?: string
          status?: string
          template_id?: string | null
          title?: string
          trade_type?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["project_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_template"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "experience_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      settings_change_requests: {
        Row: {
          created_at: string
          id: string
          new_value: Json
          old_value: Json
          reason: string | null
          requested_by: string
          review_notes: string | null
          reviewed_by: string | null
          setting_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          new_value: Json
          old_value: Json
          reason?: string | null
          requested_by: string
          review_notes?: string | null
          reviewed_by?: string | null
          setting_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          new_value?: Json
          old_value?: Json
          reason?: string | null
          requested_by?: string
          review_notes?: string | null
          reviewed_by?: string | null
          setting_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "settings_change_requests_setting_id_fkey"
            columns: ["setting_id"]
            isOneToOne: false
            referencedRelation: "system_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      student_assignments: {
        Row: {
          completion_date: string | null
          created_at: string
          educator_id: string
          feedback: string | null
          grade: string | null
          id: string
          project_id: string
          start_date: string
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          educator_id: string
          feedback?: string | null
          grade?: string | null
          id?: string
          project_id: string
          start_date: string
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          educator_id?: string
          feedback?: string | null
          grade?: string | null
          id?: string
          project_id?: string
          start_date?: string
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_assignments_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_certifications: {
        Row: {
          created_at: string
          expiry_date: string | null
          id: string
          issue_date: string
          issuing_organization: string
          name: string
          status: string
          student_id: string
          updated_at: string
          verification_url: string | null
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date: string
          issuing_organization: string
          name: string
          status?: string
          student_id: string
          updated_at?: string
          verification_url?: string | null
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string
          issuing_organization?: string
          name?: string
          status?: string
          student_id?: string
          updated_at?: string
          verification_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_certifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress_reports: {
        Row: {
          areas_for_improvement: string[] | null
          created_at: string
          educator_id: string
          id: string
          overall_progress: string
          recommendations: string | null
          report_date: string
          strengths: string[] | null
          student_id: string
          updated_at: string
        }
        Insert: {
          areas_for_improvement?: string[] | null
          created_at?: string
          educator_id: string
          id?: string
          overall_progress: string
          recommendations?: string | null
          report_date: string
          strengths?: string[] | null
          student_id: string
          updated_at?: string
        }
        Update: {
          areas_for_improvement?: string[] | null
          created_at?: string
          educator_id?: string
          id?: string
          overall_progress?: string
          recommendations?: string | null
          report_date?: string
          strengths?: string[] | null
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_reports_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_reports_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: Database["public"]["Enums"]["ticket_category"]
          created_at: string
          created_by: string
          description: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolution_notes: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          created_by: string
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          key: string
          requires_approval: boolean | null
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key: string
          requires_approval?: boolean | null
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key?: string
          requires_approval?: boolean | null
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      task_activities: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string | null
          id: string
          task_id: string
          user_id: string
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string | null
          id?: string
          task_id: string
          user_id: string
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string | null
          id?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_activities_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_submissions: {
        Row: {
          content: string | null
          feedback: string | null
          file_urls: string[] | null
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["task_status"]
          submitted_at: string | null
          submitted_by: string
          task_id: string
        }
        Insert: {
          content?: string | null
          feedback?: string | null
          file_urls?: string[] | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          submitted_at?: string | null
          submitted_by: string
          task_id: string
        }
        Update: {
          content?: string | null
          feedback?: string | null
          file_urls?: string[] | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          submitted_at?: string | null
          submitted_by?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_submissions_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_submissions_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_submissions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_by: string
          assigned_to: string
          created_at: string | null
          created_by: string
          dependencies: Json | null
          description: string | null
          due_date: string | null
          experience_id: string | null
          id: string
          priority: string
          project_id: string | null
          requires_approval: boolean | null
          status: Database["public"]["Enums"]["task_status"]
          submission_requirements: Json | null
          submission_type: string
          title: string
          type: Database["public"]["Enums"]["task_type"]
          updated_at: string | null
        }
        Insert: {
          assigned_by: string
          assigned_to: string
          created_at?: string | null
          created_by: string
          dependencies?: Json | null
          description?: string | null
          due_date?: string | null
          experience_id?: string | null
          id?: string
          priority?: string
          project_id?: string | null
          requires_approval?: boolean | null
          status?: Database["public"]["Enums"]["task_status"]
          submission_requirements?: Json | null
          submission_type?: string
          title: string
          type?: Database["public"]["Enums"]["task_type"]
          updated_at?: string | null
        }
        Update: {
          assigned_by?: string
          assigned_to?: string
          created_at?: string | null
          created_by?: string
          dependencies?: Json | null
          description?: string | null
          due_date?: string | null
          experience_id?: string | null
          id?: string
          priority?: string
          project_id?: string | null
          requires_approval?: boolean | null
          status?: Database["public"]["Enums"]["task_status"]
          submission_requirements?: Json | null
          submission_type?: string
          title?: string
          type?: Database["public"]["Enums"]["task_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "analytics_experiences"
            referencedColumns: ["experience_id"]
          },
          {
            foreignKeyName: "tasks_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "educator_experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          created_at: string
          id: string
          is_internal: boolean
          message: string
          sender_id: string
          ticket_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_internal?: boolean
          message: string
          sender_id: string
          ticket_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_internal?: boolean
          message?: string
          sender_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_message_settings: {
        Row: {
          created_at: string
          dark_mode: boolean | null
          desktop_notifications: boolean | null
          email_notifications: boolean | null
          message_preview: boolean | null
          sound_notifications: boolean | null
          theme: string | null
          typing_preview: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dark_mode?: boolean | null
          desktop_notifications?: boolean | null
          email_notifications?: boolean | null
          message_preview?: boolean | null
          sound_notifications?: boolean | null
          theme?: string | null
          typing_preview?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dark_mode?: boolean | null
          desktop_notifications?: boolean | null
          email_notifications?: boolean | null
          message_preview?: boolean | null
          sound_notifications?: boolean | null
          theme?: string | null
          typing_preview?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_support_notes: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          note_type: string
          severity: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          id?: string
          note_type: string
          severity?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          note_type?: string
          severity?: string | null
          user_id?: string
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          type: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          code: string
          created_at?: string
          expires_at: string
          id?: string
          type: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          type?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      analytics_experiences: {
        Row: {
          completed_learners: number | null
          completion_rate: number | null
          created_at: string | null
          educator_id: string | null
          experience_id: string | null
          status: Database["public"]["Enums"]["experience_status"] | null
          title: string | null
          total_learners: number | null
        }
        Relationships: [
          {
            foreignKeyName: "educator_experiences_educator_id_fkey"
            columns: ["educator_id"]
            isOneToOne: false
            referencedRelation: "educator_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_learner_participation: {
        Row: {
          active_learners: number | null
          completed_experiences: number | null
          month: string | null
          ongoing_experiences: number | null
        }
        Relationships: []
      }
      analytics_project_matches: {
        Row: {
          match_rate: number | null
          month: string | null
          review_status:
            | Database["public"]["Enums"]["project_review_status"]
            | null
          total_matches: number | null
          total_projects: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_admin_audit_log: {
        Args: {
          admin_id: string
          action_type: string
          resource_type: string
          resource_id: string
          changes: Json
          ip_address: string
        }
        Returns: string
      }
      calculate_match_score: {
        Args: {
          experience_id: string
          project_id: string
        }
        Returns: number
      }
      check_user_auth: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      cleanup_expired_verification_codes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_experience_stats: {
        Args: {
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          total_experiences: number
          active_experiences: number
          total_learners: number
          avg_completion_rate: number
          completion_count: number
        }[]
      }
      get_learner_participation_stats: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          active_learners: number
          ongoing_experiences: number
          completed_experiences: number
          month: string
        }[]
      }
      get_project_match_stats: {
        Args: {
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          total_projects: number
          total_matches: number
          match_rate: number
          review_status: Database["public"]["Enums"]["project_review_status"]
          month: string
        }[]
      }
      get_registration_stats: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          month: string
          educators_count: number
          employers_count: number
          participants_count: number
          total_count: number
        }[]
      }
      handle_chat_request_response: {
        Args: {
          request_id: string
          response: string
          responder_id: string
        }
        Returns: undefined
      }
      handle_message_reaction: {
        Args: {
          message_id: string
          user_id: string
          emoji: string
        }
        Returns: undefined
      }
      search_messages: {
        Args: {
          search_query: string
          chat_id: string
        }
        Returns: {
          application_id: string
          attachments: Json[] | null
          chat_id: string | null
          chat_type: string | null
          content: string
          created_at: string | null
          deleted_at: string | null
          edited_at: string | null
          edited_by: string | null
          encrypted_content: string | null
          encryption_metadata: Json | null
          forwarded_from: string | null
          id: string
          is_edited: boolean | null
          is_pinned: boolean | null
          last_edit_at: string | null
          mentions: Json | null
          reactions: Json[] | null
          read_at: string | null
          recipient_id: string
          reply_to: string | null
          reply_to_id: string | null
          search_vector: unknown | null
          sender_id: string
          status: string | null
          thread_id: string | null
          typing_state: boolean | null
          typing_updated_at: string | null
        }[]
      }
    }
    Enums: {
      admin_permission_level: "read" | "write" | "manage"
      admin_resource_type:
        | "users"
        | "experiences"
        | "projects"
        | "reports"
        | "settings"
        | "support"
      chat_request_status: "pending" | "accepted" | "rejected"
      conversation_type:
        | "direct_message"
        | "match_request"
        | "experience_related"
        | "general"
      employer_verification_status:
        | "pending_email_verification"
        | "email_verified"
        | "pending_admin_approval"
        | "approved"
        | "rejected"
      experience_approval_status:
        | "pending_review"
        | "approved"
        | "rejected"
        | "needs_modification"
      experience_draft_status: "in_progress" | "completed"
      experience_status:
        | "incomplete"
        | "draft"
        | "pending_approval"
        | "published"
      mentorship_mode_type: "self_guided" | "mentor_assisted"
      message_status: "sent" | "delivered" | "read"
      message_type: "text" | "file" | "system"
      milestone_status: "pending" | "in_progress" | "completed" | "overdue"
      notification_level: "all" | "important" | "critical" | "none"
      project_review_status:
        | "pending_review"
        | "approved"
        | "rejected"
        | "needs_modification"
      project_visibility: "draft" | "private" | "public"
      registration_status: "pending" | "approved" | "rejected"
      skill_level_enum: "beginner" | "intermediate" | "advanced"
      task_status:
        | "pending"
        | "in_progress"
        | "completed"
        | "approved"
        | "rejected"
      task_type: "required" | "recommended" | "optional"
      ticket_category: "technical" | "approval" | "experience" | "other"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      user_role: "admin" | "school" | "employer" | "participant"
      user_status: "pending" | "approved" | "rejected" | "suspended"
      visibility_rule: "public" | "registered" | "verified" | "admin_approved"
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
