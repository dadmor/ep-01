import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFetch } from "@/pages/api/hooks";
import { TeacherPageLayout } from "@/components/layout/TeacherPageLayout";
export const routeConfig = {
    path: "/teacher/students",
    title: "Students List",
};
export default function TeacherStudents() {
    const { data: students, isLoading } = useFetch("students", "users?role=eq.student");
    if (isLoading)
        return _jsx("div", { className: "loading loading-spinner loading-lg" });
    return (_jsxs(TeacherPageLayout, { showPadding: true, title: "Uczniowie", subtitle: "Lista uczni\u00F3w", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "\uD83D\uDC65 Lista uczni\u00F3w" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "table table-zebra", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Ucze\u0144" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Poziom" }), _jsx("th", { children: "XP" }), _jsx("th", { children: "Seria" })] }) }), _jsx("tbody", { children: students?.map((student) => (_jsxs("tr", { children: [_jsx("td", { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "avatar placeholder", children: _jsx("div", { className: "bg-neutral text-neutral-content rounded-full w-8", children: _jsx("span", { className: "text-xs", children: student.username?.[0] || "U" }) }) }), _jsx("span", { children: student.username || "Brak nazwy" })] }) }), _jsx("td", { children: student.email }), _jsx("td", { children: _jsx("div", { className: "badge badge-primary", children: student.level }) }), _jsx("td", { children: student.xp }), _jsx("td", { children: _jsx("div", { className: "badge badge-secondary", children: student.streak }) })] }, student.id))) })] }) })] }));
}
