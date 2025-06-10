// src/refinery/router/routeCollector.ts
import { RouteModule, RouteConfig, CollectedRoutes } from './types';

const routeModules = import.meta.glob('../../pages/**/*.tsx', { eager: true }) as Record<string, RouteModule>;

export const collectRoutes = (): CollectedRoutes => {
  const routes: CollectedRoutes = {};
  
  // Debug - sprawdź co zostało załadowane
  console.log('Found route modules:', Object.keys(routeModules));
  
  Object.entries(routeModules).forEach(([path, module]) => {
    console.log('Processing module:', path, module);
    const { routeConfig } = module;
    
    if (routeConfig) {
      // Obsługa pojedynczego config lub array
      const configs = Array.isArray(routeConfig) ? routeConfig : [routeConfig];
      
      configs.forEach((config: RouteConfig) => {
        // Wyciągnij nazwę komponentu z ścieżki
        const componentName = path.split('/').pop()?.replace('.tsx', '') || '';
        
        console.log('Adding route:', config.path, config);
        routes[config.path] = {
          ...config,
          component: componentName,
          modulePath: path
        };
      });
    }
  });
  
  // Dodaj redirect dla głównej strony
  routes["/"] = { 
    path: "/",
    title: "Home",
    redirect: "/dashboard" 
  };
  
  console.log('Final routes:', routes);
  return routes;
};