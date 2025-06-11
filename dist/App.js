import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "@/refinery/router";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "./daisyModule/ThemeProvider";
import { ThemeSwitcher } from "./daisyModule/ThemeSwitcher";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(ThemeProvider, { children: [" ", _jsxs(AuthProvider, { children: [" ", _jsx("div", { className: "App", children: _jsx(Router, {}) })] }), _jsx(ThemeSwitcher, {})] }) }));
}
export default App;
