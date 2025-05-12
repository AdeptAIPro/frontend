import React from "react";
import { Navigate, useLocation } from "@/utils/router-polyfill";
import { useAuth } from "@/hooks/use-auth";
import { UserRolePermissions } from "@/types/auth-types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission: UserRolePermissions;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission,
  redirectTo = "/login" 
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You can show a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has the required permission
  const hasPermission = () => {
    switch (requiredPermission) {
      case UserRolePermissions.VIEW_DASHBOARD:
        return user.permissions.canViewAnalytics;
      case UserRolePermissions.MANAGE_USERS:
        return user.permissions.canManageUsers;
      case UserRolePermissions.ADMIN:
        return user.permissions.canManageRoles;
      default:
        return true; // Allow access by default for other permissions
    }
  };

  if (!hasPermission()) {
    // Redirect to unauthorized page if they don't have permission
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
