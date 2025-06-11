import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/student/stats.CurrentStats.tsx
import { StatCard } from '@/components/ui_bloglike/base';
import { Target, Zap, Flame } from 'lucide-react';
export function CurrentStats({ stats }) {
    return (_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8", children: [_jsx(StatCard, { title: "Aktualny poziom", value: stats.level, icon: _jsx(Target, { className: "w-5 h-5" }), color: "blue" }), _jsx(StatCard, { title: "Punkty do\u015Bwiadczenia", value: stats.xp, icon: _jsx(Zap, { className: "w-5 h-5" }), color: "amber" }), _jsx(StatCard, { title: "Seria dni", value: stats.streak, icon: _jsx(Flame, { className: "w-5 h-5" }), color: "rose" })] }));
}
