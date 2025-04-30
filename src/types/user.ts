
export type UserRole = 'student' | 'alumni' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  college?: string;
  batch?: string;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProfile extends User {
  role: 'student';
  enrolledCourses?: string[];
  assignments?: {
    id: string;
    status: 'pending' | 'submitted' | 'graded';
    grade?: number;
  }[];
}

export interface AlumniProfile extends User {
  role: 'alumni';
  company?: string;
  position?: string;
  industry?: string;
  expertise?: string[];
  skills?: string[];
  isMentor?: boolean;
  domain?: string;
}

export interface AdminProfile extends User {
  role: 'admin';
  department?: string;
  permissions?: {
    manageUsers: boolean;
    manageCourses: boolean;
    manageEvents: boolean;
    viewAnalytics: boolean;
    manageSystem: boolean;
  };
}

export type UserProfile = StudentProfile | AlumniProfile | AdminProfile;
