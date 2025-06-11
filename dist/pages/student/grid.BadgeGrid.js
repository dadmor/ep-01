import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/student/grid.BadgeGrid.tsx
import { ProgressBar } from '@/components/ui_bloglike/base/ProgressBar';
import { Lock, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { badgeIcons } from './icons.badgeIcons';
export function BadgeGrid({ badges }) {
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: badges.map(badge => {
            const Icon = badgeIcons[badge.name] || badgeIcons.default;
            return (_jsx("div", { className: `bg-base-100 rounded-xl border shadow-sm p-6 transition-all duration-200 ${badge.isEarned
                    ? 'border-green-200/60 hover:shadow-md'
                    : badge.isAvailable
                        ? 'border-amber-200/60 hover:shadow-md'
                        : 'border-gray-200/60 opacity-75'}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: `w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${badge.isEarned
                                ? 'bg-green-100 border-2 border-green-200'
                                : badge.isAvailable
                                    ? 'bg-amber-100 border-2 border-amber-200'
                                    : 'bg-gray-100 border-2 border-gray-200'}`, children: badge.isEarned ? (_jsx(CheckCircle2, { className: "w-8 h-8 text-green-600" })) : badge.isAvailable ? (_jsx(Icon, { className: "w-8 h-8 text-amber-600" })) : (_jsx(Lock, { className: "w-8 h-8 text-gray-400" })) }), _jsx("h3", { className: `font-semibold mb-2 ${badge.isEarned ? 'text-green-900' :
                                badge.isAvailable ? 'text-amber-900' : 'text-gray-500'}`, children: badge.name }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: badge.description }), badge.isEarned ? (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 text-green-600", children: [_jsx(CheckCircle2, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: "Zdobyta!" })] }), badge.awardedAt && (_jsxs("div", { className: "flex items-center justify-center gap-1 text-xs text-gray-500", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsx("span", { children: new Date(badge.awardedAt).toLocaleDateString('pl-PL') })] }))] })) : badge.isAvailable ? (_jsx("div", { className: "text-amber-600", children: _jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: "Gotowa do odebrania!" })] }) })) : (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm text-gray-500", children: badge.progressText }), badge.progress > 0 && _jsx(ProgressBar, { percentage: badge.progress })] }))] }) }, badge.id));
        }) }));
}
