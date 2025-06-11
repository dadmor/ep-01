import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { colorPalette } from '../colors';
export function OverviewCard({ icon, value, label, subLabel, color }) {
    const style = colorPalette[color];
    return (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: `w-16 h-16 ${style.bg} rounded-xl flex items-center justify-center mx-auto mb-3`, children: icon }), _jsx("div", { className: `text-3xl font-bold ${style.text}`, children: value }), _jsx("div", { className: "text-sm text-gray-600", children: label }), subLabel && _jsx("div", { className: `text-xs ${style.text} mt-1`, children: subLabel })] }));
}
