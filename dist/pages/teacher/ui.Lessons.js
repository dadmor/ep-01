import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/teacher/ui.Lessons.tsx
import { useFetch } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { TeacherPageLayout } from '@/components/layout/TeacherPageLayout';
export const routeConfig = { path: "/teacher/lessons", title: "Manage Lessons" };
export default function TeacherLessons() {
    const { user } = useAuth();
    const { data: lessons, isLoading } = useFetch('teacher-lessons', `lessons?author_id=eq.${user?.id}`);
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsx("div", { className: "loading loading-spinner loading-lg" }) }));
    }
    return (_jsxs(TeacherPageLayout, { showPadding: true, title: "Uczniowie", subtitle: "Lista uczni\u00F3w", children: [_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsx("div", { className: "card-body py-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("h1", { className: "card-title text-2xl", children: [_jsx("span", { className: "text-primary", children: "\uD83D\uDCDA" }), "Moje lekcje"] }), _jsx(Link, { to: "/teacher/lessons/create", className: "btn btn-primary", children: "\u2795 Nowa lekcja" })] }) }) }), lessons && lessons.length > 0 ? (_jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: lessons.map(lesson => (_jsx("div", { className: "card bg-base-100 shadow-sm hover:shadow-md transition-shadow", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg", children: lesson.title }), _jsx("p", { className: "text-sm opacity-70 line-clamp-3", children: lesson.description }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx("div", { className: "badge badge-outline", children: lesson.subject }), lesson.grade && _jsx("div", { className: "badge badge-ghost", children: lesson.grade })] }), _jsxs("div", { className: "card-actions justify-end mt-4", children: [_jsx(Link, { to: `/teacher/lessons/${lesson.id}/edit`, className: "btn btn-sm btn-outline", children: "\u270F\uFE0F Edytuj" }), _jsx(Link, { to: `/teacher/lessons/${lesson.id}`, className: "btn btn-sm btn-primary", children: "\uD83D\uDC41\uFE0F Zobacz" })] })] }) }, lesson.id))) })) : (_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body py-16 text-center", children: [_jsx("div", { className: "text-6xl opacity-30 mb-4", children: "\uD83D\uDCDA" }), _jsx("h2", { className: "text-xl font-medium mb-2", children: "Brak lekcji" }), _jsx("p", { className: "text-base-content/70 mb-6", children: "Nie masz jeszcze \u017Cadnych lekcji. Utw\u00F3rz swoj\u0105 pierwsz\u0105 lekcj\u0119!" }), _jsx(Link, { to: "/teacher/lessons/create", className: "btn btn-primary", children: "\u2795 Utw\u00F3rz pierwsz\u0105 lekcj\u0119" })] }) }))] }));
}
