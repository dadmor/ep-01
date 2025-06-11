import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// pages/Progress.tsx - Zoptymalizowana wersja (120 linii vs 250)
import { useMemo } from 'react';
import { BarChart3, Calendar, Brain, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { useStudentData } from './hooks/useStudentData';
import { useFilters } from './hooks/useFilters';
import { StudentPageLayout } from '@/components/layout/StudentPageLayout';
import { StatsSection } from './section.StatsSection';
export const routeConfig = {
    path: "/student/progress",
    title: "Moje Postępy"
};
export default function StudentProgress() {
    const { lessons, progress, stats, isLoading } = useStudentData();
    // Calculate trend (last 5 vs previous 5)
    const trend = useMemo(() => {
        if (!progress || progress.length < 2)
            return null;
        const sorted = [...progress].sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
        const recent = sorted.slice(0, Math.min(5, sorted.length));
        const previous = sorted.slice(5, Math.min(10, sorted.length));
        if (previous.length === 0)
            return null;
        const recentAvg = recent.reduce((sum, p) => sum + p.score, 0) / recent.length;
        const previousAvg = previous.reduce((sum, p) => sum + p.score, 0) / previous.length;
        const change = recentAvg - previousAvg;
        return {
            change: Math.round(change),
            direction: change > 2 ? 'up' : change < -2 ? 'down' : 'stable',
            recentAvg: Math.round(recentAvg),
            previousAvg: Math.round(previousAvg)
        };
    }, [progress]);
    // Subject performance analysis
    const subjectAnalysis = useMemo(() => {
        if (!progress || !lessons)
            return [];
        const subjectMap = new Map();
        progress.forEach(p => {
            const lesson = lessons.find(l => l.id === p.lesson_id);
            if (lesson) {
                const subject = lesson.subject;
                if (!subjectMap.has(subject)) {
                    subjectMap.set(subject, {
                        subject,
                        scores: [],
                        totalTasks: 0,
                        correctTasks: 0,
                        attempts: 0,
                        perfectScores: 0
                    });
                }
                const data = subjectMap.get(subject);
                data.scores.push(p.score);
                data.totalTasks += p.total_tasks;
                data.correctTasks += p.correct_tasks;
                data.attempts += p.attempts_count;
                if (p.score === 100)
                    data.perfectScores++;
            }
        });
        return Array.from(subjectMap.values()).map(data => ({
            ...data,
            averageScore: Math.round(data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length),
            accuracy: Math.round((data.correctTasks / data.totalTasks) * 100),
            lessonsCount: data.scores.length,
            averageAttempts: (data.attempts / data.scores.length).toFixed(1)
        })).sort((a, b) => b.averageScore - a.averageScore);
    }, [progress, lessons]);
    // Get unique subjects for filter
    const subjects = useMemo(() => {
        if (!lessons)
            return [];
        return Array.from(new Set(lessons.map(l => l.subject).filter(Boolean)));
    }, [lessons]);
    // Filter configuration
    const filterConfigs = [
        {
            key: 'timeFilter',
            type: 'select',
            label: 'Okres',
            options: [
                { value: 'week', label: 'Ostatni tydzień' },
                { value: 'month', label: 'Ostatni miesiąc' },
                { value: 'all', label: 'Wszystkie' },
            ],
            defaultValue: 'month',
        },
        {
            key: 'subjectFilter',
            type: 'select',
            label: 'Przedmiot',
            options: [
                { value: 'all', label: 'Wszystkie' },
                ...subjects.map(subject => ({ value: subject, label: subject }))
            ],
            defaultValue: 'all',
        },
    ];
    const filterFunctions = {
        timeFilter: (progressItem, value) => {
            if (value === 'all')
                return true;
            const now = new Date();
            const cutoff = new Date();
            if (value === 'week') {
                cutoff.setDate(now.getDate() - 7);
            }
            else if (value === 'month') {
                cutoff.setMonth(now.getMonth() - 1);
            }
            return new Date(progressItem.completed_at) >= cutoff;
        },
        subjectFilter: (progressItem, value) => {
            if (value === 'all')
                return true;
            const lesson = lessons?.find(l => l.id === progressItem.lesson_id);
            return lesson?.subject === value;
        },
    };
    const { filteredData: filteredProgress, FilterComponent } = useFilters({
        data: progress || [],
        configs: filterConfigs,
        filterFunctions,
    });
    // Trend component
    const TrendOverview = () => {
        if (!trend)
            return null;
        return (_jsx("div", { className: "bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6 mb-8", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center ${trend.direction === 'up' ? 'bg-green-50 border border-green-200' :
                            trend.direction === 'down' ? 'bg-rose-50 border border-rose-200' :
                                'bg-gray-50 border border-gray-200'}`, children: trend.direction === 'up' ? (_jsx(ArrowUp, { className: "w-6 h-6 text-green-600" })) : trend.direction === 'down' ? (_jsx(ArrowDown, { className: "w-6 h-6 text-rose-600" })) : (_jsx(Minus, { className: "w-6 h-6 text-gray-600" })) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: trend.direction === 'up' ? 'Świetny postęp! 📈' :
                                    trend.direction === 'down' ? 'Skupmy się na poprawie 📉' :
                                        'Stabilny poziom 📊' }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["Twoja \u015Brednia z ostatnich lekcji: ", _jsxs("span", { className: "font-medium", children: [trend.recentAvg, "%"] }), trend.direction !== 'stable' && (_jsxs("span", { className: `ml-2 ${trend.direction === 'up' ? 'text-green-600' : 'text-rose-600'}`, children: ["(", trend.change > 0 ? '+' : '', trend.change, "% vs poprzednie)"] }))] })] })] }) }));
    };
    // Subject analysis component
    const SubjectAnalysisSection = () => (_jsxs("div", { className: "lg:col-span-2 bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx(Brain, { className: "w-5 h-5 text-purple-600" }), _jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Analiza per przedmiot" })] }), _jsxs("div", { className: "space-y-6", children: [subjectAnalysis.map(subject => (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-medium text-gray-900", children: subject.subject }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("span", { className: `font-semibold ${subject.averageScore >= 90 ? 'text-green-600' :
                                                    subject.averageScore >= 70 ? 'text-amber-600' : 'text-rose-600'}`, children: [subject.averageScore, "%"] }), _jsxs("span", { className: "text-gray-500", children: [subject.lessonsCount, " ", subject.lessonsCount === 1 ? 'lekcja' : 'lekcje'] })] })] }), _jsx("div", { className: "bg-gray-200 rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full transition-all duration-500 ${subject.averageScore >= 90 ? 'bg-green-500' :
                                        subject.averageScore >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`, style: { width: `${Math.min(subject.averageScore, 100)}%` } }) }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { className: "text-center p-3 bg-gray-50/50 rounded-lg", children: [_jsxs("div", { className: "font-semibold text-gray-900", children: [subject.accuracy, "%"] }), _jsx("div", { className: "text-xs text-gray-600", children: "Celno\u015B\u0107" })] }), _jsxs("div", { className: "text-center p-3 bg-gray-50/50 rounded-lg", children: [_jsx("div", { className: "font-semibold text-gray-900", children: subject.perfectScores }), _jsx("div", { className: "text-xs text-gray-600", children: "Perfekcyjne" })] }), _jsxs("div", { className: "text-center p-3 bg-gray-50/50 rounded-lg", children: [_jsx("div", { className: "font-semibold text-gray-900", children: subject.averageAttempts }), _jsx("div", { className: "text-xs text-gray-600", children: "\u015Ar. pr\u00F3b" })] })] })] }, subject.subject))), subjectAnalysis.length === 0 && (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(Brain, { className: "w-8 h-8 mx-auto mb-2 text-gray-400" }), _jsx("p", { children: "Uko\u0144cz lekcje, aby zobaczy\u0107 analiz\u0119 per przedmiot" })] }))] })] }));
    // Recent results component
    const RecentResultsSection = () => (_jsxs("div", { className: "bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx(Calendar, { className: "w-5 h-5 text-blue-600" }), _jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Ostatnie wyniki" })] }), _jsx("div", { className: "space-y-3 max-h-96 overflow-y-auto", children: filteredProgress.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(Calendar, { className: "w-8 h-8 mx-auto mb-2 text-gray-400" }), _jsx("p", { children: "Nie ma wynik\u00F3w w wybranym okresie" })] })) : (filteredProgress
                    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
                    .map(p => {
                    const lesson = lessons?.find(l => l.id === p.lesson_id);
                    return (_jsxs("div", { className: "p-4 bg-gray-50/50 rounded-lg border border-gray-200/30", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium text-gray-900 text-sm truncate", children: lesson?.title || 'Nieznana lekcja' }), _jsxs("div", { className: "text-xs text-gray-600 mt-1", children: [lesson?.subject, " \u2022 ", lesson?.topic] })] }), _jsxs("div", { className: `text-sm font-semibold ${p.score >= 90 ? 'text-green-600' :
                                            p.score >= 70 ? 'text-amber-600' : 'text-rose-600'}`, children: [p.score, "%"] })] }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("span", { className: "text-xs text-gray-500", children: [p.correct_tasks, "/", p.total_tasks, " poprawnych"] }), _jsx("span", { className: "text-xs text-gray-500", children: new Date(p.completed_at).toLocaleDateString('pl-PL') })] }), _jsx("div", { className: "bg-gray-200 rounded-full h-1.5", children: _jsx("div", { className: `h-1.5 rounded-full ${p.score >= 90 ? 'bg-green-500' :
                                        p.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`, style: { width: `${p.score}%` } }) })] }, p.id));
                })) })] }));
    // Detailed stats component
    const DetailedStatsSection = () => (_jsxs("div", { className: "bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-6", children: "Szczeg\u00F3\u0142owe statystyki" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "text-center p-4 bg-blue-50/30 rounded-lg border border-blue-200/30", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: stats.completedLessons }), _jsx("div", { className: "text-sm text-gray-600", children: "Uko\u0144czone lekcje" })] }), _jsxs("div", { className: "text-center p-4 bg-green-50/30 rounded-lg border border-green-200/30", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.totalTasks }), _jsx("div", { className: "text-sm text-gray-600", children: "Zadania \u0142\u0105cznie" })] }), _jsxs("div", { className: "text-center p-4 bg-amber-50/30 rounded-lg border border-amber-200/30", children: [_jsx("div", { className: "text-2xl font-bold text-amber-600", children: stats.correctTasks }), _jsx("div", { className: "text-sm text-gray-600", children: "Poprawne odpowiedzi" })] }), _jsxs("div", { className: "text-center p-4 bg-purple-50/30 rounded-lg border border-purple-200/30", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: stats.perfectScores }), _jsx("div", { className: "text-sm text-gray-600", children: "Wyniki 100%" })] })] })] }));
    return (_jsxs(StudentPageLayout, { title: "Moje Post\u0119py", subtitle: "\u015Aled\u017A swoje wyniki i analizuj post\u0119py w nauce", isLoading: isLoading, isEmpty: !stats.completedLessons, emptyState: {
            icon: _jsx(BarChart3, { className: "w-8 h-8 text-gray-400" }),
            title: "Brak danych o postępach",
            description: "Ukończ kilka lekcji, aby zobaczyć swoje statystyki",
            actionLabel: "Przejdź do kursów",
            onAction: () => window.location.href = '/student/courses',
        }, children: [_jsx(StatsSection, { type: "progress", data: stats, className: "mb-12" }), _jsx(TrendOverview, {}), _jsx(FilterComponent, {}), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8", children: [_jsx(SubjectAnalysisSection, {}), _jsx(RecentResultsSection, {})] }), _jsx(DetailedStatsSection, {})] }));
}
