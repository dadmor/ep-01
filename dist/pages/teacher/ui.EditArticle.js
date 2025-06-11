import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/teacher/ui.EditArticle.tsx
import { useFetch, useUpdate } from '@/pages/api/hooks';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export const routeConfig = { path: "/teacher/lessons/:lessonId/articles/:articleId/edit", title: "Edit Article" };
export default function EditArticle() {
    const { lessonId, articleId } = useParams();
    const navigate = useNavigate();
    const { data: articles, isLoading } = useFetch('article-edit', `articles?id=eq.${articleId}`);
    const updateArticle = useUpdate('lesson-articles', 'articles');
    const [form, setForm] = useState({
        title: '',
        content: '',
        sort_order: 0
    });
    const articleData = articles?.[0];
    // Wypełnij formularz gdy dane się załadują
    useEffect(() => {
        if (articleData) {
            setForm({
                title: articleData.title || '',
                content: articleData.content || '',
                sort_order: articleData.sort_order || 0
            });
        }
    }, [articleData]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!articleId)
            return;
        try {
            await updateArticle.mutateAsync({
                id: articleId,
                updates: form
            });
            navigate(`/teacher/lessons/${lessonId}`);
        }
        catch (error) {
            console.error('Error updating article:', error);
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsx("div", { className: "loading loading-spinner loading-lg" }) }));
    }
    if (!articleData) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body text-center", children: [_jsx("h2", { className: "text-xl font-medium mb-2", children: "Artyku\u0142 nie zosta\u0142 znaleziony" }), _jsx("p", { className: "text-base-content/70 mb-4", children: "Nie mo\u017Cna znale\u017A\u0107 artyku\u0142u o podanym ID." }), _jsx("button", { onClick: () => navigate(`/teacher/lessons/${lessonId}`), className: "btn btn-primary", children: "\u2190 Powr\u00F3t do lekcji" })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-base-200 p-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("div", { className: "card bg-base-100 shadow-sm mb-6", children: _jsxs("div", { className: "card-body py-4", children: [_jsxs("h1", { className: "card-title text-2xl", children: [_jsx("span", { className: "text-primary", children: "\u270F\uFE0F" }), "Edytuj artyku\u0142"] }), _jsxs("p", { className: "text-base-content/70", children: ["Lekcja ID: ", lessonId, " | Artyku\u0142 ID: ", articleId] })] }) }), _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83D\uDCC4 Informacje podstawowe" }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "grid md:grid-cols-4 gap-4", children: [_jsx("div", { className: "md:col-span-3", children: _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Tytu\u0142 artyku\u0142u" }), _jsx("input", { type: "text", className: "input input-bordered focus:input-primary w-full", placeholder: "Wprowad\u017A tytu\u0142 artyku\u0142u...", value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }), required: true })] }) }), _jsx("div", { className: "md:col-span-1", children: _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Kolejno\u015B\u0107" }), _jsx("input", { type: "number", className: "input input-bordered focus:input-primary w-full", value: form.sort_order, onChange: (e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 }), min: "0" })] }) })] }) })] }) }), _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83D\uDCDD Tre\u015B\u0107 artyku\u0142u" }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Zawarto\u015B\u0107" }), _jsx("textarea", { className: "textarea textarea-bordered focus:textarea-primary resize-none w-full", style: { height: '400px' }, placeholder: "Wpisz tre\u015B\u0107 artyku\u0142u...", value: form.content, onChange: (e) => setForm({ ...form, content: e.target.value }), required: true }), _jsx("div", { className: "label", children: _jsxs("span", { className: "label-text-alt text-base-content/60", children: ["Znaki: ", form.content.length] }) })] })] }) }), _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsx("div", { className: "card-body", children: _jsxs("div", { className: "card-actions justify-end", children: [_jsx("button", { type: "button", onClick: () => navigate(`/teacher/lessons/${lessonId}`), className: "btn btn-ghost", children: "Anuluj" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: updateArticle.isPending, children: updateArticle.isPending ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "loading loading-spinner loading-sm" }), "Zapisywanie..."] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: "\uD83D\uDCBE" }), "Zapisz zmiany"] })) })] }) }) })] }) })] }) }));
}
