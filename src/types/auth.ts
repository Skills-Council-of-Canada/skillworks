
export type UserRole = "admin" | "educator" | "employer" | "participant";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string, portal: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

