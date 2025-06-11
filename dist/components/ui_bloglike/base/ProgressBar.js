import { jsx as _jsx } from "react/jsx-runtime";
export function ProgressBar({ percentage }) {
    return (_jsx("div", { className: "bg-gray-200 rounded-full h-3", children: _jsx("div", { className: "bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000", style: { width: `${percentage}%` } }) }));
}
