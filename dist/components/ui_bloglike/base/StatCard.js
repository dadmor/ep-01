import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from './Card';
import { colorPalette } from '../colors';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
export function StatCard({ title, value, icon, color = 'blue', trend }) {
    const style = colorPalette[color];
    const getTrendIcon = (direction) => {
        switch (direction) {
            case 'up':
                return _jsx(ArrowUp, { className: "w-3 h-3" });
            case 'down':
                return _jsx(ArrowDown, { className: "w-3 h-3" });
            case 'stable':
                return _jsx(Minus, { className: "w-3 h-3" });
        }
    };
    const getTrendColor = (direction) => {
        switch (direction) {
            case 'up':
                return 'text-green-600 bg-green-50';
            case 'down':
                return 'text-rose-600 bg-rose-50';
            case 'stable':
                return 'text-gray-600 bg-gray-50';
        }
    };
    return (_jsx(Card, { hover: true, className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "text-sm font-medium text-gray-500 tracking-wide", children: title }), trend && (_jsxs("div", { className: `flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getTrendColor(trend.direction)}`, children: [getTrendIcon(trend.direction), _jsx("span", { children: trend.value })] }))] }), _jsx("p", { className: `text-2xl font-bold ${style.text} tracking-tight`, children: value })] }), _jsx("div", { className: `w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center border border-gray-200/40`, children: _jsx("div", { className: style.text, children: icon }) })] }) }));
}
