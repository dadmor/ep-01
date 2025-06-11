const modules = import.meta.glob("../../pages/**/*.tsx", { eager: true });
export function collectRoutes(agentMode = false) {
    const routes = {};
    Object.entries(modules).forEach(([path, mod]) => {
        const fileName = path.split('/').pop()?.toLowerCase() || '';
        // Nowy wzorzec: agent.ComponentName.tsx lub ui.ComponentName.tsx
        if (fileName.startsWith("agent.")) {
            if (!agentMode)
                return;
        }
        else if (fileName.startsWith("ui.")) {
            if (agentMode)
                return;
        }
        // Stary wzorzec: ComponentName.agent.tsx lub ComponentName.ui.tsx (dla kompatybilności)
        else if (fileName.endsWith(".agent.tsx")) {
            if (!agentMode)
                return;
        }
        else if (fileName.endsWith(".ui.tsx")) {
            if (agentMode)
                return;
        }
        // Wszystko inne pomijamy
        else {
            return;
        }
        const cfg = mod.routeConfig;
        if (!cfg)
            return;
        const list = Array.isArray(cfg) ? cfg : [cfg];
        list.forEach((c) => {
            routes[c.path] = {
                ...c,
                modulePath: path
            };
        });
    });
    return routes;
}
// Nowa funkcja do pobierania komponentu
export function getComponentForRoute(modulePath, agentMode) {
    const mod = modules[modulePath];
    if (!mod?.default) {
        console.error(`Nie znaleziono komponentu dla ścieżki: ${modulePath}`);
        return null;
    }
    return mod.default;
}
