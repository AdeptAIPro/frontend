import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRolePermissionFlags } from "@/types/auth-types";
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<{ userId: string }>;
  logout: () => Promise<void>;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get permissions for a role
const getPermissionsForRole = (role: string): UserRolePermissionFlags => {
  switch (role.toLowerCase()) {
    case "admin":
      return {
        canViewAnalytics: true,
        canManageUsers: true,
        canManageRoles: true,
        canManageSettings: true,
        canManageContent: true,
        canManageBilling: true,
        canViewReports: true,
        canManageIntegrations: true,
        canManageSecurity: true,
        canManageSupport: true
      };
    case "manager":
      return {
        canViewAnalytics: true,
        canManageUsers: true,
        canManageRoles: false,
        canManageSettings: false,
        canManageContent: true,
        canManageBilling: false,
        canViewReports: true,
        canManageIntegrations: false,
        canManageSecurity: false,
        canManageSupport: true
      };
    case "user":
      return {
        canViewAnalytics: true,
        canManageUsers: false,
        canManageRoles: false,
        canManageSettings: false,
        canManageContent: false,
        canManageBilling: false,
        canViewReports: false,
        canManageIntegrations: false,
        canManageSecurity: false,
        canManageSupport: false
      };
    default:
      return {
        canViewAnalytics: false,
        canManageUsers: false,
        canManageRoles: false,
        canManageSettings: false,
        canManageContent: false,
        canManageBilling: false,
        canViewReports: false,
        canManageIntegrations: false,
        canManageSecurity: false,
        canManageSupport: false
      };
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = Cookies.get('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, create a simple user object
      const userData: User = {
        id: '1',
        email,
        firstName: email.split('@')[0],
        lastName: '',
        role: 'user',
        permissions: getPermissionsForRole('user')
      };

      // Store in cookie
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Expires in 7 days
      setUser(userData);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // For demo purposes, create a simple user object
      const userData: User = {
        id: '1',
        email,
        firstName,
        lastName,
        role: 'user',
        permissions: getPermissionsForRole('user')
      };

      // Store in cookie
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Expires in 7 days
      setUser(userData);

      return { userId: userData.id };
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      Cookies.remove('user');
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
