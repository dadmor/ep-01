import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/teacher/ui.CreateTask.tsx
import { useInsert } from '@/pages/api/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export const routeConfig = { path: "/teacher/lessons/:lessonId/tasks/create", title: "Create Quiz" };
export default function CreateTask() {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const insertTask = useInsert('lesson-tasks', 'tasks');
    const [form, setForm] = useState({
        type: 'multiple_choice',
        question_text: '',
        options: ['', '', '', ''],
        correct_answer: '',
        explanation: '',
        xp_reward: 10
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                lesson_id: lessonId,
                type: form.type,
                question_text: form.question_text,
                options: form.type === 'multiple_choice' ? form.options.filter(opt => opt.trim()) : null,
                correct_answer: form.correct_answer,
                explanation: form.explanation,
                xp_reward: form.xp_reward
            };
            await insertTask.mutateAsync(payload);
            navigate(`/teacher/lessons/${lessonId}`);
        }
        catch (error) {
            console.error('Error creating task:', error);
        }
    };
    return (_jsxs("div", { className: "p-4 max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "\u2753 Nowy quiz" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Typ pytania" }) }), _jsxs("select", { className: "select select-bordered", value: form.type, onChange: (e) => setForm({ ...form, type: e.target.value }), children: [_jsx("option", { value: "multiple_choice", children: "Wielokrotny wyb\u00F3r" }), _jsx("option", { value: "true_false", children: "Prawda/Fa\u0142sz" }), _jsx("option", { value: "fill_blank", children: "Uzupe\u0142nij luk\u0119" })] })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Pytanie" }) }), _jsx("textarea", { className: "textarea textarea-bordered", value: form.question_text, onChange: (e) => setForm({ ...form, question_text: e.target.value }), required: true })] }), form.type === 'multiple_choice' && (_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Opcje odpowiedzi" }) }), form.options.map((option, index) => (_jsx("input", { type: "text", className: "input input-bordered mb-2", placeholder: `Opcja ${index + 1}`, value: option, onChange: (e) => {
                                    const newOptions = [...form.options];
                                    newOptions[index] = e.target.value;
                                    setForm({ ...form, options: newOptions });
                                } }, index)))] })), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Poprawna odpowied\u017A" }) }), form.type === 'true_false' ? (_jsxs("select", { className: "select select-bordered", value: form.correct_answer, onChange: (e) => setForm({ ...form, correct_answer: e.target.value }), required: true, children: [_jsx("option", { value: "", children: "Wybierz" }), _jsx("option", { value: "true", children: "Prawda" }), _jsx("option", { value: "false", children: "Fa\u0142sz" })] })) : (_jsx("input", { type: "text", className: "input input-bordered", value: form.correct_answer, onChange: (e) => setForm({ ...form, correct_answer: e.target.value }), required: true }))] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Wyja\u015Bnienie (opcjonalne)" }) }), _jsx("textarea", { className: "textarea textarea-bordered", value: form.explanation, onChange: (e) => setForm({ ...form, explanation: e.target.value }) })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Punkty XP" }) }), _jsx("input", { type: "number", className: "input input-bordered w-24", value: form.xp_reward, onChange: (e) => setForm({ ...form, xp_reward: parseInt(e.target.value) }), min: "1", required: true })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { type: "submit", className: "btn btn-primary flex-1", disabled: insertTask.isPending, children: insertTask.isPending ? 'Tworzenie...' : '✅ Utwórz quiz' }), _jsx("button", { type: "button", onClick: () => navigate(`/teacher/lessons/${lessonId}`), className: "btn btn-ghost", children: "Anuluj" })] })] })] }));
}
