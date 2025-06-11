import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./useTheme";
export function ThemeSwitcher() {
    const { theme, toggle } = useTheme();
    return (_jsx("button", { onClick: toggle, className: "btn btn-ghost btn-sm fixed bottom-4 left-4 z-50", "aria-label": "Prze\u0142\u0105cz motyw", children: theme === 'light' ?
            _jsx(Moon, { size: 16, className: "text-primary" }) :
            _jsx(Sun, { size: 16, className: "text-warning" }) }));
}
