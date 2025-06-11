import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// pages/Lesson.tsx - Zoptymalizowana wersja (60 linii vs 120)
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, BookOpen } from "lucide-react";
import { useFetch } from "@/pages/api/hooks";
import { StudentPageLayout } from "@/components/layout/StudentPageLayout";
export const routeConfig = { path: "/student/lesson/:id", title: "Lesson" };
export default function StudentLesson() {
    const { id } = useParams();
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const { data: lesson, isLoading: lessonLoading } = useFetch(`lesson-${id}`, `lessons?id=eq.${id}`);
    const { data: articles, isLoading: articlesLoading } = useFetch(`lesson-${id}-articles`, `articles?lesson_id=eq.${id}`);
    const { data: tasks, isLoading: tasksLoading } = useFetch(`lesson-${id}-tasks`, `tasks?lesson_id=eq.${id}`);
    const isLoading = lessonLoading || articlesLoading || tasksLoading;
    const currentLesson = lesson?.[0];
    const hasTasks = (tasks?.length ?? 0) > 0;
    const allAnswered = Object.keys(selectedAnswers).length === (tasks?.length ?? 0);
    const handleAnswerChange = (taskId, answer) => {
        setSelectedAnswers((prev) => ({ ...prev, [taskId]: answer }));
    };
    const LessonHeader = () => (_jsx("div", { className: "bg-gradient-to-b from-purple-50/40 to-white border-b border-gray-200/40 p-6", children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("button", { onClick: () => window.history.back(), className: "w-10 h-10 bg-base-100 rounded-xl border border-gray-200/60 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm", children: _jsx(ArrowLeft, { className: "w-5 h-5 text-gray-600" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(BookOpen, { className: "w-5 h-5 text-purple-600" }), _jsx("span", { className: "text-sm font-medium text-purple-600", children: "Lekcja" })] }), _jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: currentLesson?.title }), currentLesson?.description && (_jsx("p", { className: "text-gray-600 mt-1", children: currentLesson.description }))] })] }) }) }));
    const LessonContent = () => (_jsx("div", { className: "max-w-3xl mx-auto px-6 py-12", children: _jsxs("div", { className: "bg-base-100 rounded-xl border border-gray-200/60 shadow-sm", children: [_jsx("div", { className: "p-8 max-h-[70vh] overflow-y-auto", children: _jsxs("div", { className: "space-y-8", children: [articles?.map((article) => (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: article.title }), _jsx("div", { className: "prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed", dangerouslySetInnerHTML: { __html: article.content } })] }, article.id))), articles && articles.length > 0 && hasTasks && (_jsxs("div", { className: "flex items-center gap-4 py-6", children: [_jsx("div", { className: "flex-1 h-px bg-gray-200" }), _jsx("span", { className: "text-sm font-medium text-gray-500 px-4", children: "ZADANIA" }), _jsx("div", { className: "flex-1 h-px bg-gray-200" })] })), tasks?.map((task, idx) => (_jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-medium text-gray-900", children: [tasks.length > 1 && (_jsx("span", { className: "inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mr-3", children: idx + 1 })), task.question_text] }), task.options && (_jsx("div", { className: "space-y-3", children: task.options.map((option, optIdx) => (_jsxs("label", { className: `
                          flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border
                          ${selectedAnswers[task.id] === option
                                                ? 'bg-blue-50/50 border-blue-200/60 shadow-sm'
                                                : 'bg-gray-50/30 border-gray-200/40 hover:bg-gray-50/60 hover:border-gray-300/60'}
                          ${showResults ? 'cursor-default' : ''}
                        `, children: [_jsxs("div", { className: "relative", children: [_jsx("input", { type: "radio", name: `task-${task.id}`, value: option, className: "sr-only", onChange: () => handleAnswerChange(task.id, option), disabled: showResults }), _jsx("div", { className: `
                            w-5 h-5 rounded-full border-2 transition-colors
                            ${selectedAnswers[task.id] === option
                                                                ? 'border-blue-500 bg-blue-500'
                                                                : 'border-gray-300'}
                          `, children: selectedAnswers[task.id] === option && (_jsx("div", { className: "w-full h-full rounded-full bg-base-100 scale-[0.4]" })) })] }), _jsx("span", { className: "flex-1 text-gray-700", children: option }), showResults && selectedAnswers[task.id] === option && (_jsx(CheckCircle, { className: "w-5 h-5 text-green-600" }))] }, optIdx))) }))] }, task.id)))] }) }), hasTasks && (_jsx("div", { className: "p-6 border-t border-gray-200/40 bg-gray-50/30", children: _jsx("div", { className: "text-center", children: !showResults ? (_jsx("button", { className: `
                    px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm
                    ${!allAnswered
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md'}
                  `, onClick: () => setShowResults(true), disabled: !allAnswered, children: "Sprawd\u017A odpowiedzi" })) : (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 text-green-600", children: [_jsx(CheckCircle, { className: "w-6 h-6" }), _jsx("span", { className: "font-semibold text-lg", children: "\u015Awietnie!" })] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Odpowiedzia\u0142e\u015B na ", Object.keys(selectedAnswers).length, " z ", tasks?.length, " pyta\u0144"] })] })) }) }))] }) }));
    return (_jsxs("div", { className: "min-h-screen bg-gray-50/30", children: [_jsx(LessonHeader, {}), isLoading ? (_jsx(StudentPageLayout, { title: "", subtitle: "", isLoading: true, showPadding: false, children: _jsx(_Fragment, {}) })) : (_jsx(LessonContent, {}))] }));
}
