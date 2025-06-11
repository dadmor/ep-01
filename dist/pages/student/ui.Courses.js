import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// pages/Courses.tsx - Zoptymalizowana wersja (100 linii vs 220)
import { useMemo } from 'react';
import { Book, Filter, Trophy } from 'lucide-react';
import { CourseCard } from '@/components/CourseCard';
import { HelpSection } from '@/components/HelpSection';
import { useStudentData } from './hooks/useStudentData';
import { useFilters } from './hooks/useFilters';
import { UniversalGrid } from './grid.UniversalGrid';
import { StudentPageLayout } from '@/components/layout/StudentPageLayout';
import { StatsSection } from './section.StatsSection';
export const routeConfig = {
    path: "/student/courses",
    title: "Courses"
};
export default function StudentCourses() {
    const { lessons, progress, stats, isLoading } = useStudentData();
    // Process lessons with progress data
    const processedLessons = useMemo(() => {
        if (!lessons)
            return [];
        return lessons.map(lesson => {
            const lessonProgress = progress?.find(p => p.lesson_id === lesson.id);
            return {
                ...lesson,
                isCompleted: !!lessonProgress,
                score: lessonProgress?.score || 0,
                completedAt: lessonProgress?.completed_at
            };
        });
    }, [lessons, progress]);
    // Get unique values for filters
    const subjects = useMemo(() => Array.from(new Set(processedLessons.map(l => l.subject).filter(Boolean))), [processedLessons]);
    const grades = useMemo(() => Array.from(new Set(processedLessons.map(l => l.grade).filter(Boolean))), [processedLessons]);
    // Filter configuration
    const filterConfigs = [
        {
            key: 'search',
            type: 'text',
            label: 'Szukaj',
            placeholder: 'Szukaj kursów...',
        },
        {
            key: 'subject',
            type: 'select',
            label: 'Przedmiot',
            options: [
                { value: 'all', label: 'Wszystkie przedmioty' },
                ...subjects.map(subject => ({ value: subject, label: subject }))
            ],
            defaultValue: 'all',
        },
        {
            key: 'grade',
            type: 'select',
            label: 'Klasa',
            options: [
                { value: 'all', label: 'Wszystkie klasy' },
                ...grades.map(grade => ({ value: grade, label: grade }))
            ],
            defaultValue: 'all',
        },
    ];
    const filterFunctions = {
        search: (lesson, value) => {
            const searchTerm = value.toLowerCase();
            return lesson.title.toLowerCase().includes(searchTerm) ||
                lesson.description?.toLowerCase().includes(searchTerm) ||
                lesson.topic?.toLowerCase().includes(searchTerm);
        },
        subject: (lesson, value) => lesson.subject === value,
        grade: (lesson, value) => lesson.grade === value,
    };
    const { filteredData: filteredLessons, FilterComponent } = useFilters({
        data: processedLessons,
        configs: filterConfigs,
        filterFunctions,
    });
    // Group lessons by subject
    const lessonsBySubject = useMemo(() => {
        const grouped = {};
        filteredLessons.forEach(lesson => {
            const subject = lesson.subject || 'Inne';
            if (!grouped[subject]) {
                grouped[subject] = [];
            }
            grouped[subject].push(lesson);
        });
        return grouped;
    }, [filteredLessons]);
    // Calculate course stats
    const courseStats = useMemo(() => {
        const total = processedLessons.length;
        const completed = processedLessons.filter(l => l.isCompleted).length;
        const inProgress = total - completed;
        const totalHours = Math.floor(completed * 0.5); // 30min per lesson
        return { total, completed, inProgress, totalHours };
    }, [processedLessons]);
    const ProgressOverview = () => {
        if (!courseStats.completed)
            return null;
        return (_jsxs("div", { className: "bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/60 p-6 mb-12", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center", children: _jsx(Trophy, { className: "w-6 h-6 text-green-600" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-green-900", children: "\u015Awietna robota! \uD83C\uDF89" }), _jsxs("p", { className: "text-green-700 text-sm", children: ["Uko\u0144czy\u0142e\u015B ", courseStats.completed, " z ", courseStats.total, " dost\u0119pnych kurs\u00F3w."] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-2xl font-bold text-green-900", children: [Math.round((courseStats.completed / courseStats.total) * 100), "%"] }), _jsx("div", { className: "text-sm text-green-600", children: "uko\u0144czone" })] })] }), _jsx("div", { className: "mt-4 bg-green-200/50 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full transition-all duration-500", style: { width: `${(courseStats.completed / courseStats.total) * 100}%` } }) })] }));
    };
    const SubjectSection = ({ subject, lessons }) => {
        const completedCount = lessons.filter(l => l.isCompleted).length;
        const progressPercent = Math.round((completedCount / lessons.length) * 100);
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: subject }), _jsxs("p", { className: "text-sm text-gray-600", children: [lessons.length, " ", lessons.length === 1 ? 'kurs' : 'kursy', " \u2022", completedCount, " uko\u0144czone"] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-sm font-medium text-gray-900", children: [progressPercent, "%"] }), _jsx("div", { className: "text-xs text-gray-500", children: "post\u0119p" })] })] }), _jsx("div", { className: "bg-gray-200 rounded-full h-1.5", children: _jsx("div", { className: "bg-blue-500 h-1.5 rounded-full transition-all duration-500", style: { width: `${progressPercent}%` } }) }), _jsx(UniversalGrid, { items: lessons, renderItem: (lesson) => (_jsx(CourseCard, { id: lesson.id, title: lesson.title, description: lesson.description, subject: lesson.subject, topic: lesson.topic, grade: lesson.grade, isCompleted: lesson.isCompleted, score: lesson.score, completedAt: lesson.completedAt }, lesson.id)), gridCols: "3", emptyState: {
                        icon: _jsx(Book, { className: "w-6 h-6 text-gray-400" }),
                        title: "Brak kursów",
                        description: "Nie ma kursów w tym przedmiocie"
                    } })] }));
    };
    return (_jsxs(StudentPageLayout, { title: "Twoje Kursy", subtitle: "Rozwijaj swoje umiej\u0119tno\u015Bci dzi\u0119ki starannie przygotowanym kursom", isLoading: isLoading, isEmpty: !processedLessons.length, emptyState: {
            icon: _jsx(Book, { className: "w-8 h-8 text-gray-400" }),
            title: "Brak dostępnych kursów",
            description: "Obecnie nie ma żadnych kursów do wyświetlenia",
            actionLabel: "Odśwież stronę",
            onAction: () => window.location.reload(),
        }, children: [_jsx(StatsSection, { type: "courses", data: courseStats, className: "mb-12" }), _jsx(ProgressOverview, {}), _jsx(FilterComponent, {}), filteredLessons.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Filter, { className: "w-8 h-8 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Brak wynik\u00F3w" }), _jsx("p", { className: "text-gray-600", children: "Nie znaleziono kurs\u00F3w pasuj\u0105cych do wybranych filtr\u00F3w" })] })) : (_jsx("div", { className: "space-y-12", children: Object.entries(lessonsBySubject).map(([subject, subjectLessons]) => (_jsx(SubjectSection, { subject: subject, lessons: subjectLessons }, subject))) })), _jsx("div", { className: "max-w-4xl mx-auto mt-16", children: _jsx(HelpSection, {}) })] }));
}
