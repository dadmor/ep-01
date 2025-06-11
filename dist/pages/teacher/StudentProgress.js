import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/teacher/StudentProgress.tsx
import { useFetch } from "../api/hooks";
export const routeConfig = {
    path: "/teacher/progress",
    title: "Postęp uczniów",
    roles: ["teacher"]
};
export default function StudentProgress() {
    const { data, isLoading, error } = useFetch("progress", "progress");
    return (_jsxs("div", { children: [isLoading && _jsx("p", { children: "\u0141adowanie..." }), error && _jsxs("p", { children: ["B\u0142\u0105d: ", error.message] }), data && _jsx("pre", { children: JSON.stringify(data, null, 2) })] }));
}
