import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// pages/Dashboard.tsx - Zoptymalizowana wersja (90 linii vs 200)
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Award, Users, ChevronRight, PlayCircle, Clock, CheckCircle2, Star, AlertCircle } from 'lucide-react';
import { HelpSection } from '@/components/HelpSection';
import { useStudentData } from './hooks/useStudentData';
import { StudentPageLayout } from '@/components/layout/StudentPageLayout';
import { StatsSection } from './section.StatsSection';
export const routeConfig = {
    path: "/student/dashboard",
    title: "Student Dashboard"
};
// Quick action configuration
const quickActions = [
    {
        to: "/student/courses",
        icon: BookOpen,
        title: "Przeglądaj kursy",
        subtitle: "Znajdź nowe lekcje",
        color: "blue"
    },
    {
        to: "/student/progress",
        icon: TrendingUp,
        title: "Moje postępy",
        subtitle: "Szczegółowe statystyki",
        color: "green"
    },
    {
        to: "/student/achievements",
        icon: Award,
        title: "Osiągnięcia",
        subtitle: "Odznaki i nagrody",
        color: "purple"
    },
    {
        to: "/student/leaderboard",
        icon: Users,
        title: "Ranking",
        subtitle: "Porównaj się z innymi",
        color: "amber"
    }
];
export default function StudentDashboard() {
    const { lessons, progress, userBadges, stats, isLoading } = useStudentData();
    // Recent activity (last 5)
    const recentProgress = useMemo(() => {
        return progress?.sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()).slice(0, 5) || [];
    }, [progress]);
    // Recommended lessons (not completed)
    const recommendedLessons = useMemo(() => {
        return lessons?.filter(lesson => !progress?.some(p => p.lesson_id === lesson.id)).slice(0, 3) || [];
    }, [lessons, progress]);
    const QuickActionsSection = () => (_jsxs("div", { className: "bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6 mb-8", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Szybkie akcje" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: quickActions.map(action => (_jsxs(Link, { to: action.to, className: `flex items-center gap-3 p-4 bg-${action.color}-50/50 hover:bg-${action.color}-100/50 rounded-lg border border-${action.color}-200/40 transition-colors group`, children: [_jsx("div", { className: `w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-200 transition-colors`, children: _jsx(action.icon, { className: `w-5 h-5 text-${action.color}-600` }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-gray-900", children: action.title }), _jsx("div", { className: "text-xs text-gray-600", children: action.subtitle })] }), _jsx(ChevronRight, { className: "w-4 h-4 text-gray-400 group-hover:text-gray-600" })] }, action.to))) })] }));
    const RecommendedSection = () => (_jsxs("div", { className: "lg:col-span-2 bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx(PlayCircle, { className: "w-5 h-5 text-blue-600" }), _jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Polecane dla Ciebie" }), _jsx(Link, { to: "/student/courses", className: "text-sm text-blue-600 hover:text-blue-700 font-medium ml-auto", children: "Zobacz wszystkie" })] }), _jsx("div", { className: "space-y-3", children: !recommendedLessons.length ? (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(BookOpen, { className: "w-8 h-8 mx-auto mb-2 text-gray-400" }), _jsx("p", { children: "Uko\u0144czy\u0142e\u015B wszystkie dost\u0119pne lekcje!" })] })) : (recommendedLessons.map(lesson => (_jsx(Link, { to: `/student/lesson/${lesson.id}`, className: "block p-4 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors border border-gray-200/30 group", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-gray-900 group-hover:text-blue-600 transition-colors", children: lesson.title }), _jsxs("div", { className: "text-sm text-gray-600 mt-1", children: [lesson.subject, " \u2022 ", lesson.topic] })] }), _jsx(ChevronRight, { className: "w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" })] }) }, lesson.id)))) })] }));
    const RecentActivitySection = () => (_jsxs("div", { className: "bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx(Clock, { className: "w-5 h-5 text-green-600" }), _jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Ostatnia aktywno\u015B\u0107" })] }), _jsx("div", { className: "space-y-3 max-h-80 overflow-y-auto", children: !recentProgress.length ? (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(TrendingUp, { className: "w-8 h-8 mx-auto mb-2 text-gray-400" }), _jsx("p", { children: "Rozpocznij nauk\u0119, aby zobaczy\u0107 post\u0119py" })] })) : (recentProgress.map(p => {
                    const lesson = lessons?.find(l => l.id === p.lesson_id);
                    const getScoreIcon = (score) => {
                        if (score >= 90)
                            return _jsx(CheckCircle2, { className: "w-4 h-4 text-green-600" });
                        if (score >= 70)
                            return _jsx(Star, { className: "w-4 h-4 text-amber-600" });
                        return _jsx(AlertCircle, { className: "w-4 h-4 text-rose-600" });
                    };
                    return (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg", children: [_jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${p.score >= 90 ? 'bg-green-100' :
                                    p.score >= 70 ? 'bg-amber-100' : 'bg-rose-100'}`, children: getScoreIcon(p.score) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-medium text-gray-900 truncate", children: lesson?.title || 'Nieznana lekcja' }), _jsx("div", { className: "text-xs text-gray-500", children: new Date(p.completed_at).toLocaleDateString('pl-PL') })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: `text-sm font-semibold ${p.score >= 90 ? 'text-green-600' :
                                        p.score >= 70 ? 'text-amber-600' : 'text-rose-600'}`, children: [p.score, "%"] }) })] }, p.id));
                })) })] }));
    return (_jsxs(StudentPageLayout, { title: `Witaj, ${stats?.level ? 'poziom ' + stats.level : ''}! 👋`, subtitle: "Tw\u00F3j panel do nauki i \u015Bledzenia post\u0119p\u00F3w", isLoading: isLoading, children: [_jsx(StatsSection, { type: "dashboard", data: stats, gridCols: "6", className: "mb-12" }), _jsx(QuickActionsSection, {}), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12", children: [_jsx(RecommendedSection, {}), _jsx(RecentActivitySection, {})] }), _jsx(HelpSection, {})] }));
}
