
export type UserStatus = "approved" | "rejected" | "pending" | "suspended";
export type UserRole = "educator" | "employer" | "participant" | "admin";

export interface Profile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
}
