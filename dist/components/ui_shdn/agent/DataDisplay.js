import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const DataDisplay = ({ data, title = "📋 Dane", isCollapsible = true, defaultExpanded = true, size = "xs", }) => {
    const sizeClasses = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    };
    if (!isCollapsible) {
        return (_jsx("div", { className: "mockup-code", children: _jsx("pre", { children: _jsx("code", { className: sizeClasses[size], children: JSON.stringify(data, null, 2) }) }) }));
    }
    return (_jsxs("div", { className: "collapse collapse-arrow bg-base-200", children: [_jsx("input", { type: "checkbox", defaultChecked: defaultExpanded }), _jsx("div", { className: "collapse-title text-sm font-medium", children: title }), _jsx("div", { className: "collapse-content", children: _jsx("div", { className: "mockup-code", children: _jsx("pre", { children: _jsx("code", { className: sizeClasses[size], children: JSON.stringify(data, null, 2) }) }) }) })] }));
};
