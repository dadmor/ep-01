import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function LoadingSpinner({ message = "Ładowanie..." }) {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50/30", children: _jsxs("div", { className: "flex flex-col items-center gap-6", children: [_jsx("div", { className: "relative", children: _jsx("div", { className: "w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" }) }), _jsx("p", { className: "text-gray-600 font-medium text-sm", children: message })] }) }));
}
