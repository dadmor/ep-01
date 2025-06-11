import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/teacher/ui.CreateArticle.tsx
import { useInsert } from '@/pages/api/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export const routeConfig = { path: "/teacher/lessons/:lessonId/articles/create", title: "Add Content" };
export default function CreateArticle() {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const insertArticle = useInsert('lesson-articles', 'articles');
    const [form, setForm] = useState({
        title: '',
        content: '',
        sort_order: 0
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await insertArticle.mutateAsync({
                ...form,
                lesson_id: lessonId
            });
            navigate(`/teacher/lessons/${lessonId}`);
        }
        catch (error) {
            console.error('Error creating article:', error);
        }
    };
    return (_jsxs("div", { className: "p-4 space-y-4 max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "\uD83D\uDCC4 Dodaj tre\u015B\u0107" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Tytu\u0142 tre\u015Bci" }) }), _jsx("input", { type: "text", className: "input input-bordered", value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }), required: true })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Kolejno\u015B\u0107" }) }), _jsx("input", { type: "number", className: "input input-bordered w-24", value: form.sort_order, onChange: (e) => setForm({ ...form, sort_order: parseInt(e.target.value) }) })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text", children: "Tre\u015B\u0107" }) }), _jsx("textarea", { className: "textarea textarea-bordered h-96", value: form.content, onChange: (e) => setForm({ ...form, content: e.target.value }), placeholder: "Wpisz tre\u015B\u0107 lekcji...", required: true })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { type: "submit", className: "btn btn-primary flex-1", disabled: insertArticle.isPending, children: insertArticle.isPending ? 'Dodawanie...' : '✅ Dodaj treść' }), _jsx("button", { type: "button", onClick: () => navigate(`/teacher/lessons/${lessonId}`), className: "btn btn-ghost", children: "Anuluj" })] })] })] }));
}
