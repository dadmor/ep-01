// src/refinery/router/types.ts
import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  title: string;
  roles?: string[];
  redirect?: string;
  component?: string;
  modulePath?: string;
}

export interface RouteModule {
  routeConfig?: RouteConfig | RouteConfig[];
  default?: ComponentType<any>;
}

export interface CollectedRoutes {
  [path: string]: RouteConfig;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export interface User {
  role: string;
  // Add other user properties as needed
}

export interface AuthHook {
  user: User | null;
  loading: boolean;
}