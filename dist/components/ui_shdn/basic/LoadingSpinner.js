import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function LoadingSpinner({ message = "Ładowanie..." }) {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50", children: _jsxs("div", { className: "flex flex-col items-center gap-6 p-8 bg-base-100 rounded-3xl shadow-xl border-2 border-blue-200", children: [_jsxs("div", { className: "relative", children: [_jsx("span", { className: "loading loading-spinner loading-lg text-blue-500" }), _jsx("div", { className: "absolute inset-0 loading loading-spinner loading-lg text-purple-300 animate-pulse" })] }), _jsx("p", { className: "text-gray-700 font-semibold text-lg", children: message })] }) }));
}
