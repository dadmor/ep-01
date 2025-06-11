import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/teacher/QuizEditor.tsx
import { useInsert } from "../api/hooks";
export const routeConfig = [
    { path: "/teacher/quizzes/create", title: "Nowy quiz", roles: ["teacher"] },
    { path: "/teacher/quizzes/:quizId/edit", title: "Edytuj quiz", roles: ["teacher"] }
];
const mockTask = {
    lesson_id: '',
    type: 'multiple_choice',
    question_text: 'Przykładowe pytanie',
    options: ['A', 'B', 'C'],
    correct_answer: 'A',
    xp_reward: 10
};
export default function QuizEditor() {
    const mutation = useInsert('tasks', 'tasks');
    return (_jsxs("div", { children: [_jsx("button", { onClick: () => mutation.mutate(mockTask), children: "Wy\u015Blij dane testowe" }), mutation.isPending && _jsx("p", { children: "\u0141adowanie..." }), mutation.error && _jsxs("p", { children: ["B\u0142\u0105d: ", mutation.error.message] }), mutation.data && _jsx("pre", { children: JSON.stringify(mutation.data, null, 2) })] }));
}
