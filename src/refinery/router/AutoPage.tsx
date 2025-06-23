// src/refinery/router/AutoPage.tsx
import React, { useEffect, useMemo } from "react";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import { collectRoutes, getComponentForRoute } from "./routeCollector";
import { ProtectedRoute } from "./ProtectedRoute";

// Funkcja do dopasowywania ścieżki z parametrami
function matchRoute(pathname: string, routePath: string): boolean {
  const pathSegments = pathname.split('/').filter(Boolean);
  const routeSegments = routePath.split('/').filter(Boolean);
  
  if (pathSegments.length !== routeSegments.length) {
    return false;
  }
  
  return routeSegments.every((segment, index) => {
    return segment.startsWith(':') || segment === pathSegments[index];
  });
}

// ✅ NAPRAWA: Funkcja do obliczania priorytetu route'a
function getRoutePriority(routePath: string): number {
  const segments = routePath.split('/').filter(Boolean);
  let priority = 0;
  
  segments.forEach((segment, index) => {
    if (!segment.startsWith(':')) {
      // Statyczne segmenty mają wyższy priorytet
      priority += 1000 - index;
    } else {
      // Parametryczne segmenty mają niższy priorytet
      priority += 1 - index;
    }
  });
  
  return priority;
}

// ✅ NAPRAWA: Funkcja do znajdowania konfiguracji route'a z priorytetami
function findRouteConfig(pathname: string, routes: Record<string, any>) {
  // Najpierw spróbuj dokładnego dopasowania (najwyższy priorytet)
  if (routes[pathname]) {
    return routes[pathname];
  }
  
  // Znajdź wszystkie pasujące route'y
  const matchingRoutes = [];
  for (const [routePath, config] of Object.entries(routes)) {
    if (matchRoute(pathname, routePath)) {
      matchingRoutes.push({
        routePath,
        config,
        priority: getRoutePriority(routePath)
      });
    }
  }
  
  // Sortuj według priorytetu (malejąco) i zwróć pierwszy
  if (matchingRoutes.length > 0) {
    matchingRoutes.sort((a, b) => b.priority - a.priority);
    return matchingRoutes[0].config;
  }
  
  return null;
}

export const AutoPage: React.FC = () => {
  const { agentMode = false } = useLoaderData() as { agentMode?: boolean };
  const { pathname } = useLocation();

  // Memoizuj routes żeby nie zbierać ich przy każdym renderze
  const routes = useMemo(() => collectRoutes(agentMode), [agentMode]);
  
  const config = findRouteConfig(pathname, routes);
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">404 – Strona nie znaleziona</h1>
          <p className="text-gray-600">Ścieżka: {pathname}</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Tryb: {agentMode ? 'Agent' : 'UI'}</p>
            <p>Dostępne ścieżki:</p>
            <ul className="list-disc list-inside max-h-40 overflow-y-auto">
              {Object.keys(routes)
                .sort((a, b) => getRoutePriority(b) - getRoutePriority(a))
                .map(path => (
                <li key={path} className="text-left">
                  {path} (priorytet: {getRoutePriority(path)})
                </li>
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
          <h1 className="text-2xl font-bold mb-4">Błąd ładowania komponentu</h1>
          <p className="text-gray-600">Nie można załadować komponentu dla: {pathname}</p>
          <p className="text-sm text-gray-500 mt-2">Module path: {config.modulePath}</p>
        </div>
      </div>
    );
  }

  const page = <Component key={pathname} />;

  return config.roles
    ? <ProtectedRoute roles={config.roles}>{page}</ProtectedRoute>
    : page;
};