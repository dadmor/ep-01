import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/refinery/router/AutoPage.tsx
import { useEffect, useMemo } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { collectRoutes, getComponentForRoute } from "./routeCollector";
import { ProtectedRoute } from "./ProtectedRoute";
// Funkcja do dopasowywania ścieżki z parametrami
function matchRoute(pathname, routePath) {
    const pathSegments = pathname.split('/').filter(Boolean);
    const routeSegments = routePath.split('/').filter(Boolean);
    if (pathSegments.length !== routeSegments.length) {
        return false;
    }
    return routeSegments.every((segment, index) => {
        return segment.startsWith(':') || segment === pathSegments[index];
    });
}
// Funkcja do znajdowania konfiguracji route'a
function findRouteConfig(pathname, routes) {
    // Najpierw spróbuj dokładnego dopasowania
    if (routes[pathname]) {
        return routes[pathname];
    }
    // Następnie spróbuj dopasowania z parametrami
    for (const [routePath, config] of Object.entries(routes)) {
        if (matchRoute(pathname, routePath)) {
            return config;
        }
    }
    return null;
}
export const AutoPage = () => {
    const { agentMode = false } = useLoaderData();
    const { pathname } = useLocation();
    // Memoizuj routes żeby nie zbierać ich przy każdym renderze
    const routes = useMemo(() => collectRoutes(agentMode), [agentMode]);
    const config = findRouteConfig(pathname, routes);
    if (!config) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "404 \u2013 Strona nie znaleziona" }), _jsxs("p", { className: "text-gray-600", children: ["\u015Acie\u017Cka: ", pathname] }), _jsxs("div", { className: "mt-4 text-sm text-gray-500", children: [_jsxs("p", { children: ["Tryb: ", agentMode ? 'Agent' : 'UI'] }), _jsx("p", { children: "Dost\u0119pne \u015Bcie\u017Cki:" }), _jsx("ul", { className: "list-disc list-inside", children: Object.keys(routes).map(path => (_jsx("li", { children: path }, path))) })] })] }) }));
    }
    useEffect(() => {
        if (config.title) {
            document.title = config.title;
        }
    }, [config.title]);
    // Pobierz komponent bezpośrednio z załadowanych modułów
    const Component = getComponentForRoute(config.modulePath, agentMode);
    if (!Component) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "B\u0142\u0105d \u0142adowania komponentu" }), _jsxs("p", { className: "text-gray-600", children: ["Nie mo\u017Cna za\u0142adowa\u0107 komponentu dla: ", pathname] })] }) }));
    }
    const page = _jsx(Component, {}, pathname);
    return config.roles
        ? _jsx(ProtectedRoute, { roles: config.roles, children: page })
        : page;
};
