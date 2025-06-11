import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { StudentMenu } from '@/pages/student/menu.StudentMenu';
import { EmptyState, LoadingSpinner, PageHeader } from '@/components/ui_bloglike/base';
const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
};
export const StudentPageLayout = ({ title, subtitle, children, isLoading = false, isEmpty = false, emptyState, maxWidth = '6xl', showPadding = true, }) => {
    const renderContent = () => {
        if (isLoading) {
            return _jsx(LoadingSpinner, { message: `Ładowanie ${title.toLowerCase()}...` });
        }
        if (isEmpty && emptyState) {
            return (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "max-w-lg", children: _jsx(EmptyState, { ...emptyState }) }) }));
        }
        return children;
    };
    return (_jsxs(SidebarLayout, { menuComponent: _jsx(StudentMenu, { userRole: "student" }), children: [_jsx(PageHeader, { title: title, subtitle: subtitle, variant: "courses" }), _jsx("div", { className: `${maxWidthClasses[maxWidth]} ${showPadding ? 'px-6 py-16' : 'px-6'}`, children: renderContent() })] }));
};
