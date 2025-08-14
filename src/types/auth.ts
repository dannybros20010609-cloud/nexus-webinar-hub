export type UserRole = 'admin' | 'host' | 'guest' | 'user';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  company?: string;
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  phone?: string;
  name: string;
  company?: string;
  interests?: string[];
}