import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/auth/ui.StudentWelcome.tsx - Z DAISYUI
import { PageHeader } from '@/components/ui_bloglike/base';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Book, PenTool, TrendingUp, Award, Home, LogOut } from 'lucide-react';
export const routeConfig = {
    path: "/auth/student-welcome",
    title: "Student welcome"
};
export default function StudentWelcome() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const studentFeatures = [
        {
            icon: _jsx(Book, { className: "w-8 h-8 text-info" }),
            title: 'Kursy',
            desc: 'Przeglądaj dostępne kursy',
            path: '/student/courses',
            bgColor: 'bg-info/10'
        },
        {
            icon: _jsx(PenTool, { className: "w-8 h-8 text-success" }),
            title: 'Zadania',
            desc: 'Rozwiązuj ćwiczenia',
            path: '/student/exercises',
            bgColor: 'bg-success/10'
        },
        {
            icon: _jsx(TrendingUp, { className: "w-8 h-8 text-primary" }),
            title: 'Postępy',
            desc: 'Śledź swoje wyniki',
            path: '/student/progress',
            bgColor: 'bg-primary/10'
        },
        {
            icon: _jsx(Award, { className: "w-8 h-8 text-warning" }),
            title: 'Osiągnięcia',
            desc: 'Zdobywaj odznaki',
            path: '/student/achievements',
            bgColor: 'bg-warning/10'
        }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-base-200/50", children: [_jsx(PageHeader, { title: "Panel Studenta", subtitle: `Witaj ${user?.username}! Wybierz, co chcesz robić dzisiaj` }), _jsx("div", { className: "container mx-auto px-8 py-16", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("div", { className: "card bg-base-100 shadow-sm p-12 mb-12", children: _jsxs("div", { className: "card-body items-center text-center p-0", children: [_jsx("div", { className: "w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-3xl flex items-center justify-center mb-6", children: _jsx("div", { className: "text-4xl", children: "\uD83C\uDF93" }) }), _jsx("h2", { className: "card-title text-3xl font-serif tracking-tight mb-4", children: "Tw\u00F3j Portal Edukacyjny" }), _jsx("p", { className: "text-base-content/70 text-lg leading-relaxed max-w-md", children: "Rozwijaj swoje umiej\u0119tno\u015Bci w przyjaznym \u015Brodowisku nauki" })] }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12", children: studentFeatures.map((feature, index) => (_jsx("div", { className: "card bg-base-100 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200", onClick: () => navigate(feature.path), children: _jsx("div", { className: "card-body p-8", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: `w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center`, children: feature.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "card-title text-xl font-serif tracking-tight mb-2", children: feature.title }), _jsx("p", { className: "text-base-content/70 leading-relaxed", children: feature.desc })] })] }) }) }, index))) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs("button", { onClick: () => navigate('/student/dashboard'), className: "btn btn-primary btn-lg gap-3", children: [_jsx(Home, { className: "w-5 h-5" }), "G\u0142\u00F3wny panel"] }), _jsxs("button", { onClick: () => logout(), className: "btn btn-ghost btn-lg gap-3", children: [_jsx(LogOut, { className: "w-5 h-5" }), "Wyloguj"] })] })] }) })] }));
}
