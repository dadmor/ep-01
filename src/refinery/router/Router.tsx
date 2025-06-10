// src/refinery/router/Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { collectRoutes } from "./routeCollector";
import { AutoPage } from "./AutoPage";

export const Router: React.FC = () => {
  const routes = collectRoutes();
  
  return (
    <BrowserRouter>
      <Routes>
        {Object.keys(routes).map((path) => (
          <Route key={path} path={path} element={<AutoPage />} />
        ))}
        <Route path="*" element={<AutoPage />} />
      </Routes>
    </BrowserRouter>
  );
};