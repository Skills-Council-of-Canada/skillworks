
export type UserRole = "admin" | "educator" | "employer" | "participant";

export interface User {
  id: string; // This will store the UUID
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

