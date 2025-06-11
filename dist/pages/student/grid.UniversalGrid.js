import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EmptyState } from '@/components/ui_bloglike/base';
const gridColsClasses = {
    auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};
const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
};
export function UniversalGrid({ items, renderItem, emptyState, className = '', gridCols = 'auto', gap = 'md', loading = false, loadingComponent, }) {
    if (loading && loadingComponent) {
        return _jsx(_Fragment, { children: loadingComponent });
    }
    if (!items.length && emptyState) {
        return (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "max-w-lg", children: _jsx(EmptyState, { ...emptyState }) }) }));
    }
    return (_jsx("div", { className: `grid ${gridColsClasses[gridCols]} ${gapClasses[gap]} ${className}`, children: items.map(renderItem) }));
}
// Specialized grids for common use cases
export const BadgeGrid = ({ badges }) => (_jsx(UniversalGrid, { items: badges, renderItem: (badge) => (_jsx("div", { className: `bg-base-100 rounded-xl border shadow-sm p-6 transition-all duration-200 ${badge.isEarned
            ? 'border-green-200/60 hover:shadow-md'
            : badge.isAvailable
                ? 'border-amber-200/60 hover:shadow-md'
                : 'border-gray-200/60 opacity-75'}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: `w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${badge.isEarned ? 'bg-green-100 border-2 border-green-200' :
                        badge.isAvailable ? 'bg-amber-100 border-2 border-amber-200' :
                            'bg-gray-100 border-2 border-gray-200'}` }), _jsx("h3", { className: "font-semibold mb-2", children: badge.name }), _jsx("p", { className: "text-sm text-gray-600", children: badge.description })] }) }, badge.id)), emptyState: {
        icon: _jsx(_Fragment, {}),
        title: "Brak odznak",
        description: "Nie znaleziono odznak spełniających kryteria"
    } }));
export const CourseGrid = ({ courses }) => (_jsx(UniversalGrid, { items: courses, renderItem: (course) => (_jsx("div", { className: "bg-base-100 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200", children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: course.title }), _jsx("p", { className: "text-sm text-gray-600 mb-4", children: course.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-gray-500", children: course.subject }), course.isCompleted && (_jsx("span", { className: "text-xs text-green-600 font-medium", children: "Uko\u0144czony" }))] })] }) }, course.id)), emptyState: {
        icon: _jsx(_Fragment, {}),
        title: "Brak kursów",
        description: "Nie znaleziono kursów spełniających kryteria"
    } }));
