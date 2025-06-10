// src/refinery/router/Router.tsx
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, RouteObject } from "react-router-dom";
import { AutoPage } from "./AutoPage";
import { collectRoutes } from "./routeCollector";

const globalLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  return { agentMode: url.searchParams.get("agentMode") === "true" };
};

// Funkcja do tworzenia dynamicznych route'ów
const createDynamicRoutes = () => {
  const agentRoutes = collectRoutes(true);
  const uiRoutes = collectRoutes(false);
  
  const routes: RouteObject[] = [];
  
  // Dodaj route'y dla trybu UI (domyślny)
  Object.values(uiRoutes).forEach(config => {
    routes.push({
      path: config.path,
      loader: () => ({ agentMode: false }),
      element: <AutoPage />
    });
  });
  
  // Dodaj route'y dla trybu Agent (z parametrem)
  Object.values(agentRoutes).forEach(config => {
    routes.push({
      path: config.path,
      loader: () => ({ agentMode: true }),
      element: <AutoPage />
    });
  });
  
  return routes;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />
  },
  ...createDynamicRoutes(),
  {
    path: "*", // Fallback dla nieznanych ścieżek
    loader: globalLoader,
    element: <AutoPage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}