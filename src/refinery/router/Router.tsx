// src/refinery/router/Router.tsx
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AutoPage } from "./AutoPage";

const globalLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  return { agentMode: url.searchParams.get("agentMode") === "true" };
};

// Dodaj statyczny redirect dla głównej strony
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />
  },
  {
    path: "*", // Wszystkie inne ścieżki
    loader: globalLoader,
    element: <AutoPage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
