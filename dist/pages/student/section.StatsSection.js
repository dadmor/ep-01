import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StatCard, OverviewCard } from '@/components/ui_bloglike/base';
import { ProgressBar } from '@/components/ui_bloglike/base/ProgressBar';
import { Trophy, Target, Flame, BookOpen, TrendingUp, Clock, Star, BarChart3, Zap, Medal, CheckCircle2 } from 'lucide-react';
const statConfigs = {
    dashboard: [
        { key: 'xp', icon: Trophy, label: 'Poziom XP', color: 'amber' },
        { key: 'level', icon: Target, label: 'Poziom', color: 'blue' },
        { key: 'streak', icon: Flame, label: 'Seria dni', color: 'purple' },
        { key: 'averageScore', icon: BarChart3, label: 'Średnia', color: 'green', suffix: '%' },
        { key: 'badgesEarned', icon: Medal, label: 'Odznaki', color: 'purple' },
        { key: 'perfectScores', icon: Star, label: 'Perfekcyjne', color: 'amber' },
    ],
    achievements: [
        {
            key: 'earned',
            icon: Trophy,
            label: 'Zdobyte odznaki',
            color: 'purple',
            subLabel: (data) => `z ${data.total} dostępnych`
        },
        { key: 'percentage', icon: Target, label: 'Ukończone', color: 'amber', suffix: '%' },
        {
            key: 'perfectScores',
            icon: Star,
            label: 'Perfekcyjne wyniki',
            color: 'green',
            subLabel: '100% poprawnych'
        },
        {
            key: 'averageScore',
            icon: TrendingUp,
            label: 'Średnia ocena',
            color: 'blue',
            suffix: '%',
            subLabel: 'ze wszystkich lekcji'
        },
    ],
    progress: [
        { key: 'averageScore', icon: TrendingUp, label: 'Średnia ocena', color: 'blue', suffix: '%' },
        { key: 'accuracy', icon: Target, label: 'Celność', color: 'green', suffix: '%' },
        { key: 'perfectScores', icon: Star, label: 'Perfekcyjne wyniki', color: 'amber' },
        { key: 'averageAttempts', icon: Clock, label: 'Śr. liczba prób', color: 'purple' },
    ],
    courses: [
        { key: 'total', icon: BookOpen, label: 'Dostępne kursy', color: 'blue' },
        { key: 'inProgress', icon: Clock, label: 'W trakcie', color: 'amber' },
        { key: 'completed', icon: CheckCircle2, label: 'Ukończone', color: 'green' },
        { key: 'totalHours', icon: Zap, label: 'Godziny nauki', color: 'purple', suffix: 'h' },
    ],
};
const gridColsClasses = {
    auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    '6': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6',
};
// Color mapping for Tailwind classes
const getIconColor = (color) => {
    const colorMap = {
        purple: 'text-purple-600',
        amber: 'text-amber-600',
        green: 'text-green-600',
        blue: 'text-blue-600',
    };
    return colorMap[color] || 'text-gray-600';
};
export const StatsSection = ({ type, data, showProgress = false, showOverview = false, className = '', gridCols = 'auto', }) => {
    const configs = statConfigs[type] || [];
    const renderOverviewCards = () => (_jsx("div", { className: `grid ${gridColsClasses[gridCols]} gap-6 ${className}`, children: configs.map(config => {
            const value = data[config.key];
            const subLabel = typeof config.subLabel === 'function'
                ? config.subLabel(data)
                : config.subLabel;
            return (_jsx(OverviewCard, { icon: _jsx(config.icon, { className: `w-8 h-8 ${getIconColor(config.color)}` }), value: `${value}${config.suffix || ''}`, label: config.label, subLabel: subLabel, color: config.color }, config.key));
        }) }));
    const renderStatCards = () => (_jsx("div", { className: `grid ${gridColsClasses[gridCols]} gap-6 ${className}`, children: configs.map(config => {
            const value = data[config.key];
            // StatCard accepts more colors, so we can safely cast or extend
            const statCardColor = config.color;
            return (_jsx(StatCard, { title: config.label, value: `${value}${config.suffix || ''}`, icon: _jsx(config.icon, { className: "w-5 h-5" }), color: statCardColor }, config.key));
        }) }));
    const renderProgressBar = () => {
        if (!showProgress || data.percentage === undefined)
            return null;
        return (_jsxs("div", { className: "mt-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "Post\u0119p osi\u0105gni\u0119\u0107" }), _jsxs("span", { className: "text-sm text-gray-600", children: [data.earned || 0, " / ", data.total || 0] })] }), _jsx(ProgressBar, { percentage: data.percentage })] }));
    };
    if (showOverview) {
        return (_jsxs("div", { className: `bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200/60 p-8 mb-12 ${className}`, children: [renderOverviewCards(), renderProgressBar()] }));
    }
    return (_jsxs("div", { className: className, children: [renderStatCards(), renderProgressBar()] }));
};
