import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/PageHeader.tsx
import { colorPalette } from "../colors";
export function PageHeader({ title, subtitle, variant = "default", className = "", }) {
    const variantBorders = {
        default: colorPalette.default.border,
        courses: colorPalette.blue.border,
        dashboard: colorPalette.green.border,
        lesson: colorPalette.purple.border,
        progress: colorPalette.green.border,
        achievements: colorPalette.amber.border,
        leaderboard: colorPalette.rose.border,
    };
    return (_jsx("div", { className: `border-b border-slate-200 bg-base-100 ${className}`, children: _jsx("div", { className: "container space-y-1 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16", children: _jsxs("div", { className: `border-l-8 pl-8 space-y-2 ${variantBorders[variant]}`, children: [_jsx("h1", { className: "scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl", children: title }), _jsx("p", { className: "text-lg text-muted-foreground sm:text-xl", children: subtitle })] }) }) }));
}
