// src/refinery/router/AutoPage.tsx
import { useEffect, lazy, Suspense, ComponentType } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { collectRoutes } from './routeCollector';
import { ProtectedRoute } from './ProtectedRoute';

const componentCache = new Map<string, React.LazyExoticComponent<ComponentType<any>>>();

function loadComponent(modulePath: string): React.LazyExoticComponent<ComponentType<any>> {
  if (!componentCache.has(modulePath)) {
    const component = lazy(() => import(/* @vite-ignore */ modulePath));
    componentCache.set(modulePath, component);
  }
  return componentCache.get(modulePath)!;
}

export const AutoPage = (): JSX.Element => {
  const { pathname } = useLocation();
  const routes = collectRoutes();
  const config = routes[pathname];
  
  if (!config) {
    return <div>404 - Page not found</div>;
  }
  
  if (config.redirect) {
    return <Navigate to={config.redirect} replace />;
  }
  
  useEffect(() => {
    if (config.title) {
      document.title = config.title;
    }
  }, [config.title]);
  
  if (!config.modulePath) {
    return <div>Error: Module path not found</div>;
  }
  
  const Component = loadComponent(config.modulePath);
  
  const PageContent = (): JSX.Element => (
    <div>
      <h1>{config.title}</h1>
      <Suspense fallback={<div>Loading component...</div>}>
        <Component />
      </Suspense>
    </div>
  );
  
  if (config.roles) {
    return (
      <ProtectedRoute roles={config.roles}>
        <PageContent />
      </ProtectedRoute>
    );
  }
  
  return <PageContent />;
}