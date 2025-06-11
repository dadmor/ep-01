import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, } from "lucide-react";
export const menuItems = {
    teacher: [
        { path: "/teacher/dashboard", label: "Panel główny", icon: Home },
        { path: "/teacher/lessons", label: "Lekcje", icon: Home },
        { path: "/teacher/students", label: "Studenci", icon: BookOpen },
    ],
};
export const TeacherMenu = ({ userRole }) => {
    const currentMenuItems = menuItems[userRole] || [];
    return (_jsx("nav", { className: "space-y-2", children: currentMenuItems.map((item) => {
            const Icon = item.icon;
            return (_jsxs(NavLink, { to: item.path, className: ({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"}`, children: [_jsx(Icon, { className: "w-5 h-5" }), item.label] }, item.path));
        }) }));
};
