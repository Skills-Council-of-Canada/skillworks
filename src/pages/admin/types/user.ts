
export type UserStatus = "approved" | "rejected" | "pending" | "suspended";
export type UserRole = "educator" | "employer" | "participant" | "admin";

export interface Profile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  preferred_contact?: string;
}
