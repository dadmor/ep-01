import { jsx as _jsx } from "react/jsx-runtime";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { EmptyState, LoadingSpinner, } from "@/components/ui_bloglike/base";
import { TeacherMenu } from "@/pages/teacher/menu.TeacherMenu";
const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
};
export const TeacherPageLayout = ({ title, children, isLoading = false, isEmpty = false, emptyState, maxWidth = "6xl", }) => {
    const renderContent = () => {
        if (isLoading) {
            return _jsx(LoadingSpinner, { message: `Ładowanie ${title.toLowerCase()}...` });
        }
        if (isEmpty && emptyState) {
            return (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "max-w-lg", children: _jsx(EmptyState, { ...emptyState }) }) }));
        }
        return children;
    };
    return (_jsx(SidebarLayout, { menuComponent: _jsx(TeacherMenu, { userRole: "teacher" }), children: _jsx("div", { className: `${maxWidthClasses[maxWidth]} p-12 space-y-8`, children: renderContent() }) }));
};
