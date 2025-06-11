import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/teacher/ui.EditTask.tsx
import { useFetch, useUpdate } from '@/pages/api/hooks';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export const routeConfig = { path: "/teacher/lessons/:lessonId/tasks/:taskId/edit", title: "Edit Quiz" };
export default function EditTask() {
    const { lessonId, taskId } = useParams();
    const navigate = useNavigate();
    const { data: tasks, isLoading } = useFetch('task-edit', `tasks?id=eq.${taskId}`);
    const updateTask = useUpdate('lesson-tasks', 'tasks');
    const [form, setForm] = useState({
        type: 'multiple_choice',
        question_text: '',
        options: ['', '', '', ''],
        correct_answer: '',
        explanation: '',
        xp_reward: 10
    });
    const taskData = tasks?.[0];
    // Wypełnij formularz gdy dane się załadują
    useEffect(() => {
        if (taskData) {
            setForm({
                type: taskData.type || 'multiple_choice',
                question_text: taskData.question_text || '',
                options: taskData.options || ['', '', '', ''],
                correct_answer: taskData.correct_answer || '',
                explanation: taskData.explanation || '',
                xp_reward: taskData.xp_reward || 10
            });
        }
    }, [taskData]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskId)
            return;
        try {
            const payload = {
                type: form.type,
                question_text: form.question_text,
                options: form.type === 'multiple_choice' ? form.options.filter(opt => opt.trim()) : null,
                correct_answer: form.correct_answer,
                explanation: form.explanation,
                xp_reward: form.xp_reward
            };
            await updateTask.mutateAsync({
                id: taskId,
                updates: payload
            });
            navigate(`/teacher/lessons/${lessonId}`);
        }
        catch (error) {
            console.error('Error updating task:', error);
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsx("div", { className: "loading loading-spinner loading-lg" }) }));
    }
    if (!taskData) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body text-center", children: [_jsx("h2", { className: "text-xl font-medium mb-2", children: "Zadanie nie zosta\u0142o znalezione" }), _jsx("p", { className: "text-base-content/70 mb-4", children: "Nie mo\u017Cna znale\u017A\u0107 zadania o podanym ID." }), _jsx("button", { onClick: () => navigate(`/teacher/lessons/${lessonId}`), className: "btn btn-primary", children: "\u2190 Powr\u00F3t do lekcji" })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-base-200 p-4", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("div", { className: "card bg-base-100 shadow-sm mb-6", children: _jsxs("div", { className: "card-body py-4", children: [_jsxs("h1", { className: "card-title text-2xl", children: [_jsx("span", { className: "text-primary", children: "\u270F\uFE0F" }), "Edytuj quiz"] }), _jsxs("p", { className: "text-base-content/70", children: ["Lekcja ID: ", lessonId, " | Zadanie ID: ", taskId] })] }) }), _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\u2753 Typ pytania" }), _jsx("div", { className: "form-control", children: _jsxs("select", { className: "select select-bordered focus:select-primary w-full", value: form.type, onChange: (e) => setForm({ ...form, type: e.target.value }), children: [_jsx("option", { value: "multiple_choice", children: "\uD83D\uDCDD Wielokrotny wyb\u00F3r" }), _jsx("option", { value: "true_false", children: "\u2705 Prawda/Fa\u0142sz" }), _jsx("option", { value: "fill_blank", children: "\uD83D\uDCDD Uzupe\u0142nij luk\u0119" })] }) })] }) }), _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83D\uDCAD Pytanie" }), _jsx("div", { className: "form-control", children: _jsx("textarea", { className: "textarea textarea-bordered focus:textarea-primary h-24 resize-none w-full", placeholder: "Wpisz tre\u015B\u0107 pytania...", value: form.question_text, onChange: (e) => setForm({ ...form, question_text: e.target.value }), required: true }) })] }) }), form.type === 'multiple_choice' && (_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83D\uDCCB Opcje odpowiedzi" }), _jsx("div", { className: "space-y-3", children: form.options.map((option, index) => (_jsxs("div", { className: "form-control", children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: ["Opcja ", index + 1] }), _jsx("input", { type: "text", className: "input input-bordered focus:input-primary w-full", placeholder: `Wprowadź opcję ${index + 1}...`, value: option, onChange: (e) => {
                                                            const newOptions = [...form.options];
                                                            newOptions[index] = e.target.value;
                                                            setForm({ ...form, options: newOptions });
                                                        } })] }, index))) })] }) })), _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\u2705 Poprawna odpowied\u017A" }), _jsx("div", { className: "form-control", children: form.type === 'true_false' ? (_jsxs("select", { className: "select select-bordered focus:select-primary w-full", value: form.correct_answer, onChange: (e) => setForm({ ...form, correct_answer: e.target.value }), required: true, children: [_jsx("option", { value: "", children: "Wybierz odpowied\u017A" }), _jsx("option", { value: "true", children: "\u2705 Prawda" }), _jsx("option", { value: "false", children: "\u274C Fa\u0142sz" })] })) : (_jsx("input", { type: "text", className: "input input-bordered focus:input-primary w-full", placeholder: "Wpisz poprawn\u0105 odpowied\u017A...", value: form.correct_answer, onChange: (e) => setForm({ ...form, correct_answer: e.target.value }), required: true })) })] }) }), _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83D\uDCA1 Dodatkowe informacje" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Wyja\u015Bnienie (opcjonalne)" }), _jsx("textarea", { className: "textarea textarea-bordered focus:textarea-primary h-20 resize-none w-full", placeholder: "Dodaj wyja\u015Bnienie do odpowiedzi...", value: form.explanation, onChange: (e) => setForm({ ...form, explanation: e.target.value }) })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Punkty XP za poprawn\u0105 odpowied\u017A" }), _jsx("input", { type: "number", className: "input input-bordered focus:input-primary w-32", value: form.xp_reward, onChange: (e) => setForm({ ...form, xp_reward: parseInt(e.target.value) || 0 }), min: "1", required: true })] })] })] }) }), _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsx("div", { className: "card-body", children: _jsxs("div", { className: "card-actions justify-end", children: [_jsx("button", { type: "button", onClick: () => navigate(`/teacher/lessons/${lessonId}`), className: "btn btn-ghost", children: "Anuluj" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: updateTask.isPending, children: updateTask.isPending ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "loading loading-spinner loading-sm" }), "Zapisywanie..."] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: "\uD83D\uDCBE" }), "Zapisz zmiany"] })) })] }) }) })] }) })] }) }));
}
