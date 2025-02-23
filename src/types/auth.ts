
export type UserRole = "admin" | "educator" | "employer" | "participant";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  preferred_contact?: string;
  skill_level?: string;
  availability?: string;
  educational_background?: string;
  preferred_learning_areas?: string[];
  created_at?: string;
  updated_at?: string;
  status?: string;
  online_status?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string, portal: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
