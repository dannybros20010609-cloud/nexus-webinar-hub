import { create } from 'zustand';
import { AuthState, User, LoginCredentials, SignupData } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@nexushub.com',
    name: 'Admin User',
    role: 'admin',
    company: 'NexusHub',
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'host@nexushub.com',
    name: 'John Host',
    role: 'host',
    company: 'TechCorp',
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'user@nexushub.com',
    name: 'Jane User',
    role: 'user',
    company: 'StartupXYZ',
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true });
    
    // Mock login - find user by email
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (user) {
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } else {
      set({ isLoading: false });
      throw new Error('Invalid credentials');
    }
  },

  signup: async (data: SignupData) => {
    set({ isLoading: true });
    
    // Mock signup - create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      phone: data.phone,
      name: data.name,
      role: 'user',
      company: data.company,
      isVerified: false,
      createdAt: new Date().toISOString()
    };

    mockUsers.push(newUser);
    
    set({ 
      user: newUser, 
      isAuthenticated: true, 
      isLoading: false 
    });
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },

  setUser: (user: User | null) => {
    set({ 
      user, 
      isAuthenticated: !!user 
    });
  }
}));