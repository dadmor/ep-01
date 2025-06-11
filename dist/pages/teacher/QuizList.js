import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/teacher/QuizList.tsx
import { useFetch } from "../api/hooks";
export const routeConfig = {
    path: "/teacher/quizzes",
    title: "Lista quizów",
    roles: ["teacher"]
};
export default function QuizList() {
    const { data, isLoading, error } = useFetch("tasks", "tasks");
    return (_jsxs("div", { children: [isLoading && _jsx("p", { children: "\u0141adowanie..." }), error && _jsxs("p", { children: ["B\u0142\u0105d: ", error.message] }), data && _jsx("pre", { children: JSON.stringify(data, null, 2) })] }));
}
