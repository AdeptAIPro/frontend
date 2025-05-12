export enum UserRolePermissions {
  VIEW_DASHBOARD = "VIEW_DASHBOARD",
  MANAGE_USERS = "MANAGE_USERS",
  ADMIN = "ADMIN"
}

export interface UserRolePermissionFlags {
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canManageRoles: boolean;
  canManageSettings: boolean;
  canManageContent: boolean;
  canManageBilling: boolean;
  canViewReports: boolean;
  canManageIntegrations: boolean;
  canManageSecurity: boolean;
  canManageSupport: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: UserRolePermissionFlags;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<{ userId: string }>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  resendSignUpCode: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}
