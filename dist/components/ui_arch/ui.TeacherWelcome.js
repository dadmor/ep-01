import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/auth/ui.TeacherWelcome.tsx - POPRAWIONA KONFIGURACJA
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export const routeConfig = {
    path: "/auth/teacher-welcome",
    title: "Teacher welcome"
};
export default function TeacherWelcome() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const teacherFeatures = [
        { icon: '📖', title: 'Kursy', desc: 'Zarządzaj swoimi kursami', path: '/teacher/courses' },
        { icon: '👥', title: 'Studenci', desc: 'Przeglądaj uczniów', path: '/teacher/students' },
        { icon: '📝', title: 'Zadania', desc: 'Twórz ćwiczenia', path: '/teacher/exercises' },
        { icon: '📈', title: 'Analityka', desc: 'Statystyki i raporty', path: '/teacher/analytics' }
    ];
    return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center p-4", children: _jsx("div", { className: "card w-full max-w-2xl bg-base-100 shadow-xl", children: _jsxs("div", { className: "card-body", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "text-6xl text-secondary mb-4", children: "\uD83D\uDC68\u200D\uD83C\uDFEB" }), _jsx("h1", { className: "text-3xl font-bold text-secondary mb-2", children: "Panel Nauczyciela" }), _jsxs("p", { className: "text-base-content/70", children: ["Witaj ", user?.username, "! Wybierz, co chcesz robi\u0107:"] })] }), _jsx("div", { className: "grid grid-cols-2 gap-4 mb-6", children: teacherFeatures.map((feature, index) => (_jsx("div", { className: "card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors", onClick: () => navigate(feature.path), children: _jsxs("div", { className: "card-body items-center text-center p-4", children: [_jsx("div", { className: "text-3xl mb-2", children: feature.icon }), _jsx("h3", { className: "font-bold", children: feature.title }), _jsx("p", { className: "text-sm text-base-content/70", children: feature.desc })] }) }, index))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => navigate('/teacher/dashboard'), className: "btn btn-secondary flex-1", children: "\uD83C\uDFE0 G\u0142\u00F3wny panel" }), _jsx("button", { onClick: () => logout(), className: "btn btn-ghost", children: "Wyloguj" })] })] }) }) }));
}
