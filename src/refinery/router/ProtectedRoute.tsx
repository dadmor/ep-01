// src/refinery/router/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks";
import { ProtectedRouteProps } from './types';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles = [],
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Ładowanie…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};