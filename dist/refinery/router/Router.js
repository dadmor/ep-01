import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AutoPage } from "./AutoPage";
import { collectRoutes } from "./routeCollector";
const globalLoader = async ({ request }) => {
    const url = new URL(request.url);
    return { agentMode: url.searchParams.get("agentMode") === "true" };
};
// Funkcja do tworzenia dynamicznych route'ów
const createDynamicRoutes = () => {
    const agentRoutes = collectRoutes(true);
    const uiRoutes = collectRoutes(false);
    const routes = [];
    // Dodaj route'y dla trybu UI (domyślny)
    Object.values(uiRoutes).forEach(config => {
        routes.push({
            path: config.path,
            loader: () => ({ agentMode: false }),
            element: _jsx(AutoPage, {})
        });
    });
    // Dodaj route'y dla trybu Agent (z parametrem)
    Object.values(agentRoutes).forEach(config => {
        routes.push({
            path: config.path,
            loader: () => ({ agentMode: true }),
            element: _jsx(AutoPage, {})
        });
    });
    return routes;
};
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(Navigate, { to: "/auth/login", replace: true })
    },
    ...createDynamicRoutes(),
    {
        path: "*",
        loader: globalLoader,
        element: _jsx(AutoPage, {})
    }
]);
export function Router() {
    return _jsx(RouterProvider, { router: router });
}
