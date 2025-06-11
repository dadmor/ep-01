import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/teacher/TeacherDashboard.tsx
import { useFetch } from "../api/hooks";
export const routeConfig = {
    path: "/teacher/dashboard",
    title: "Panel nauczyciela",
    roles: ["teacher"]
};
export default function TeacherDashboard() {
    const { data, isLoading, error } = useFetch("lessons", "lessons");
    return (_jsxs("div", { children: [isLoading && _jsx("p", { children: "\u0141adowanie..." }), error && _jsxs("p", { children: ["B\u0142\u0105d: ", error.message] }), data && _jsx("pre", { children: JSON.stringify(data, null, 2) })] }));
}
