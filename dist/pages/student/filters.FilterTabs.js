import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export function FilterTabs({ filter, counts, setFilter }) {
    return (_jsx("div", { className: "bg-base-100 rounded-xl border border-base-300 shadow-sm p-6 mb-8", children: _jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { onClick: () => setFilter("all"), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all"
                        ? "bg-primary text-primary-content border border-primary-focus"
                        : "text-base-content/70 hover:bg-base-200"}`, children: ["Wszystkie (", counts.all, ")"] }), _jsxs("button", { onClick: () => setFilter("earned"), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "earned"
                        ? "bg-success text-success-content border border-success-focus"
                        : "text-base-content/70 hover:bg-base-200"}`, children: ["Zdobyte (", counts.earned, ")"] }), _jsxs("button", { onClick: () => setFilter("available"), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "available"
                        ? "bg-warning text-warning-content border border-warning-focus"
                        : "text-base-content/70 hover:bg-base-200"}`, children: ["Dost\u0119pne (", counts.available, ")"] })] }) }));
}
