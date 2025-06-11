import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks";
export const ProtectedRoute = ({ children, roles = [], }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return _jsx("div", { children: "\u0141adowanie\u2026" });
    }
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (roles.length > 0 && !roles.includes(user.role)) {
        return _jsx(Navigate, { to: "/unauthorized", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
