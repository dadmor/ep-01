// src/refinery/router/AutoPage.tsx
import React, { useEffect, useMemo } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { collectRoutes, getComponentForRoute } from "./routeCollector";
import { ProtectedRoute } from "./ProtectedRoute";

export const AutoPage: React.FC = () => {
  const { agentMode = false } = useLoaderData() as { agentMode?: boolean };
  const { pathname } = useLocation();

  // Memoizuj routes żeby nie zbierać ich przy każdym renderze
  const routes = useMemo(() => collectRoutes(agentMode), [agentMode]);
  
  const config = routes[pathname];
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">404 – Strona nie znaleziona</h1>
          <p className="text-gray-600">Ścieżka: {pathname}</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Tryb: {agentMode ? 'Agent' : 'UI'}</p>
            <p>Dostępne ścieżki:</p>
            <ul className="list-disc list-inside">
              {Object.keys(routes).map(path => (
                <li key={path}>{path}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (config.title) {
      document.title = config.title;
    }
  }, [config.title]);

  // Pobierz komponent bezpośrednio z załadowanych modułów
  const Component = getComponentForRoute(config.modulePath!, agentMode);

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Błąd ładowania komponenetu</h1>
          <p className="text-gray-600">Nie można załadować komponentu dla: {pathname}</p>
        </div>
      </div>
    );
  }

  const page = <Component key={pathname} />;

  return config.roles
    ? <ProtectedRoute roles={config.roles}>{page}</ProtectedRoute>
    : page;
};