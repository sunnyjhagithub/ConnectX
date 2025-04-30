
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AlumniProfile, StudentProfile, AdminProfile } from '@/types/user';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  isAuthorized: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: (User | AlumniProfile | StudentProfile | AdminProfile)[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "student@example.com",
    role: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  } as StudentProfile,
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "alumni@example.com",
    role: "alumni",
    company: "Google",
    position: "Software Engineer",
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as AlumniProfile,
  {
    id: "3",
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  } as AdminProfile,
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      setIsAuthenticated(true);
      setUserRole(parsedUser.role);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserRole(user.role);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return Promise.resolve();
    }
    
    return Promise.reject(new Error('Invalid credentials'));
  };

  const register = async (userData: Partial<User>, password: string) => {
    // Simulate API call
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      role: userData.role || 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // In a real app, we would send this to an API
    console.log("Registered new user:", newUser);
    
    // Auto login after registration
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    setUserRole(newUser.role);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return Promise.resolve();
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('currentUser');
  };

  const isAuthorized = (allowedRoles: UserRole[]): boolean => {
    if (!isAuthenticated || !userRole) return false;
    return allowedRoles.includes(userRole);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      userRole,
      login,
      register,
      logout,
      isAuthorized
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
