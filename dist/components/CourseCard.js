import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/CourseCard.tsx
import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, Play, Trophy, Target, BookOpen, Calendar } from 'lucide-react';
export function CourseCard({ id, title, description, subject, topic, grade, isCompleted = false, score = 0, completedAt, difficulty = 'beginner', estimatedTime = 30 }) {
    const difficultyColors = {
        beginner: 'text-green-600 bg-green-50 border-green-200',
        intermediate: 'text-amber-600 bg-amber-50 border-amber-200',
        advanced: 'text-rose-600 bg-rose-50 border-rose-200'
    };
    const difficultyLabels = {
        beginner: 'Podstawowy',
        intermediate: 'Średni',
        advanced: 'Zaawansowany'
    };
    const getScoreColor = (score) => {
        if (score >= 90)
            return 'text-green-600 bg-green-50';
        if (score >= 70)
            return 'text-amber-600 bg-amber-50';
        if (score >= 50)
            return 'text-orange-600 bg-orange-50';
        return 'text-rose-600 bg-rose-50';
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'short'
        });
    };
    return (_jsx(Link, { to: `/student/lesson/${id}`, className: "block group", children: _jsxs("div", { className: "relative bg-base-100 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/60 transition-all duration-200 overflow-hidden h-full", children: [_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "p-6 pb-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2", children: title }), topic && (_jsx("p", { className: "text-sm text-gray-600 mt-1", children: topic }))] }), _jsx("div", { className: "ml-3", children: isCompleted ? (_jsx("div", { className: "w-8 h-8 bg-green-100 rounded-full flex items-center justify-center", children: _jsx(CheckCircle2, { className: "w-5 h-5 text-green-600" }) })) : (_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors", children: _jsx(Play, { className: "w-4 h-4 text-blue-600 ml-0.5" }) })) })] }), _jsx("p", { className: "text-sm text-gray-600 line-clamp-2 mb-4", children: description }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-gray-500 mb-4", children: [grade && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Target, { className: "w-3 h-3" }), _jsx("span", { children: grade })] })), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsxs("span", { children: [estimatedTime, " min"] })] }), _jsx("div", { className: `px-2 py-1 rounded-full text-xs border ${difficultyColors[difficulty]}`, children: difficultyLabels[difficulty] })] })] }), isCompleted ? (_jsx("div", { className: "px-6 pb-6", children: _jsxs("div", { className: "bg-gray-50/50 rounded-lg p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Trophy, { className: "w-4 h-4 text-amber-600" }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: "Uko\u0144czono" })] }), _jsxs("div", { className: `px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(score)}`, children: [score, "%"] })] }), completedAt && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-gray-500", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsx("span", { children: formatDate(completedAt) })] })), _jsx("div", { className: "mt-3 bg-gray-200 rounded-full h-1.5", children: _jsx("div", { className: `h-1.5 rounded-full transition-all duration-500 ${score >= 90 ? 'bg-green-500' :
                                                score >= 70 ? 'bg-amber-500' :
                                                    score >= 50 ? 'bg-orange-500' : 'bg-rose-500'}`, style: { width: `${score}%` } }) })] }) })) : (_jsx("div", { className: "px-6 pb-6", children: _jsx("div", { className: "bg-blue-50/30 rounded-lg p-3 border border-blue-200/30", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "w-4 h-4 text-blue-600" }), _jsx("span", { className: "text-sm font-medium text-blue-900", children: "Gotowy do rozpocz\u0119cia" })] }), _jsx("div", { className: "text-xs text-blue-600 font-medium", children: "Rozpocznij \u2192" })] }) }) }))] }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/5 group-hover:to-transparent transition-all duration-200 pointer-events-none opacity-0 group-hover:opacity-50" })] }) }));
}
