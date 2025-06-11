import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/teacher/ui.EditLesson.tsx
import { useFetch, useUpdate } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export const routeConfig = { path: "/teacher/lessons/:id/edit", title: "Edit Lesson" };
export default function EditLesson() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: lessons, isLoading } = useFetch('lesson-edit', `lessons?id=eq.${id}`);
    const updateLesson = useUpdate('teacher-lessons', 'lessons');
    const [form, setForm] = useState({
        title: '',
        description: '',
        subject: '',
        grade: '',
        topic: ''
    });
    const lessonData = lessons?.[0];
    // Wypełnij formularz gdy dane się załadują
    useEffect(() => {
        if (lessonData) {
            setForm({
                title: lessonData.title || '',
                description: lessonData.description || '',
                subject: lessonData.subject || '',
                grade: lessonData.grade || '',
                topic: lessonData.topic || ''
            });
        }
    }, [lessonData]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id)
            return;
        try {
            // Don't parse id as integer - keep it as string since it's a UUID
            await updateLesson.mutateAsync({
                id: id,
                updates: form
            });
            navigate(`/teacher/lessons/${id}`);
        }
        catch (error) {
            console.error('Error updating lesson:', error);
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsx("div", { className: "loading loading-spinner loading-lg" }) }));
    }
    if (!lessonData) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body text-center", children: [_jsx("h2", { className: "text-xl font-medium mb-2", children: "Lekcja nie zosta\u0142a znaleziona" }), _jsx("p", { className: "text-base-content/70 mb-4", children: "Nie mo\u017Cna znale\u017A\u0107 lekcji o podanym ID." }), _jsx("button", { onClick: () => navigate('/teacher/lessons'), className: "btn btn-primary", children: "\u2190 Powr\u00F3t do listy lekcji" })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-base-200 p-4", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("div", { className: "card bg-base-100 shadow-sm mb-6", children: _jsxs("div", { className: "card-body py-4", children: [_jsxs("h1", { className: "card-title text-2xl", children: [_jsx("span", { className: "text-primary", children: "\u270F\uFE0F" }), "Edytuj lekcj\u0119"] }), _jsxs("p", { className: "text-base-content/70", children: ["ID: ", id] })] }) }), _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83D\uDCD6 Podstawowe informacje" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Tytu\u0142 lekcji" }), _jsx("input", { type: "text", className: "input input-bordered focus:input-primary w-full", placeholder: "Wprowad\u017A tytu\u0142 lekcji...", value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }), required: true })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Opis" }), _jsx("textarea", { className: "textarea textarea-bordered focus:textarea-primary h-24 resize-none w-full", placeholder: "Opisz czego dotyczy lekcja...", value: form.description, onChange: (e) => setForm({ ...form, description: e.target.value }) })] })] })] }) }), _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83C\uDFF7\uFE0F Klasyfikacja" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Przedmiot" }), _jsxs("select", { className: "select select-bordered focus:select-primary w-full", value: form.subject, onChange: (e) => setForm({ ...form, subject: e.target.value }), children: [_jsx("option", { value: "", children: "Wybierz przedmiot" }), _jsx("option", { value: "Matematyka", children: "\uD83D\uDCD0 Matematyka" }), _jsx("option", { value: "Polski", children: "\uD83D\uDCDA Polski" }), _jsx("option", { value: "Historia", children: "\uD83C\uDFDB\uFE0F Historia" }), _jsx("option", { value: "Biologia", children: "\uD83E\uDDEC Biologia" })] })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Klasa" }), _jsxs("select", { className: "select select-bordered focus:select-primary w-full", value: form.grade, onChange: (e) => setForm({ ...form, grade: e.target.value }), children: [_jsx("option", { value: "", children: "Wybierz klas\u0119" }), _jsx("option", { value: "Klasa 1", children: "\uD83E\uDD47 Klasa 1" }), _jsx("option", { value: "Klasa 2", children: "\uD83E\uDD48 Klasa 2" }), _jsx("option", { value: "Klasa 3", children: "\uD83E\uDD49 Klasa 3" })] })] })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Temat" }), _jsx("input", { type: "text", className: "input input-bordered focus:input-primary w-full", placeholder: "G\u0142\u00F3wny temat lekcji...", value: form.topic, onChange: (e) => setForm({ ...form, topic: e.target.value }) })] })] })] }) }), _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsx("div", { className: "card-body", children: _jsxs("div", { className: "card-actions justify-end", children: [_jsx("button", { type: "button", onClick: () => navigate(`/teacher/lessons/${id}`), className: "btn btn-ghost", children: "Anuluj" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: updateLesson.isPending, children: updateLesson.isPending ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "loading loading-spinner loading-sm" }), "Zapisywanie..."] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: "\uD83D\uDCBE" }), "Zapisz zmiany"] })) })] }) }) })] }) })] }) }));
}
