import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/teacher/ui.TaskDetail.tsx
import { useFetch, useDelete } from '@/pages/api/hooks';
import { useNavigate, useParams } from 'react-router-dom';
export const routeConfig = { path: "/teacher/lessons/:lessonId/tasks/:taskId", title: "Quiz Details" };
export default function TaskDetail() {
    const { lessonId, taskId } = useParams();
    const navigate = useNavigate();
    const { data: tasks, isLoading } = useFetch('task-detail', `tasks?id=eq.${taskId}`);
    const deleteTask = useDelete('lesson-tasks', 'tasks');
    const taskData = tasks?.[0];
    const handleDelete = async () => {
        if (window.confirm('Czy na pewno chcesz usunąć ten quiz?')) {
            try {
                await deleteTask.mutateAsync({ id: taskId });
                navigate(`/teacher/lessons/${lessonId}`);
            }
            catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };
    const getTypeLabel = (type) => {
        switch (type) {
            case 'multiple_choice': return '📝 Wielokrotny wybór';
            case 'true_false': return '✅ Prawda/Fałsz';
            case 'fill_blank': return '📝 Uzupełnij lukę';
            default: return type;
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsx("div", { className: "loading loading-spinner loading-lg" }) }));
    }
    if (!taskData) {
        return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center", children: _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body text-center", children: [_jsx("h2", { className: "text-xl font-medium mb-2", children: "Quiz nie zosta\u0142 znaleziony" }), _jsx("p", { className: "text-base-content/70 mb-4", children: "Nie mo\u017Cna znale\u017A\u0107 quizu o podanym ID." }), _jsx("button", { onClick: () => navigate(`/teacher/lessons/${lessonId}`), className: "btn btn-primary", children: "\u2190 Powr\u00F3t do lekcji" })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-base-200 p-4", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("div", { className: "card bg-base-100 shadow-sm mb-6", children: _jsx("div", { className: "card-body py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h1", { className: "card-title text-2xl", children: [_jsx("span", { className: "text-primary", children: "\u2753" }), "Szczeg\u00F3\u0142y quizu"] }), _jsxs("p", { className: "text-base-content/70", children: ["Lekcja ID: ", lessonId, " | Quiz ID: ", taskId] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { onClick: () => navigate(`/teacher/lessons/${lessonId}/tasks/${taskId}/edit`), className: "btn btn-primary btn-sm", children: [_jsx("span", { children: "\u270F\uFE0F" }), "Edytuj"] }), _jsxs("button", { onClick: handleDelete, className: "btn btn-error btn-sm", disabled: deleteTask.isPending, children: [deleteTask.isPending ? (_jsx("span", { className: "loading loading-spinner loading-xs" })) : (_jsx("span", { children: "\uD83D\uDDD1\uFE0F" })), "Usu\u0144"] })] })] }) }) }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83C\uDFAF Podstawowe informacje" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-base-content/70", children: "Typ pytania" }), _jsx("div", { className: "badge badge-primary badge-lg", children: getTypeLabel(taskData.type) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-base-content/70", children: "Pytanie" }), _jsx("div", { className: "bg-base-200 p-4 rounded-lg border-l-4 border-primary", children: taskData.question_text })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-base-content/70", children: "Punkty XP za poprawn\u0105 odpowied\u017A" }), _jsxs("div", { className: "badge badge-accent badge-lg", children: ["\u2B50 ", taskData.xp_reward, " XP"] })] })] })] }) }), taskData.type === 'multiple_choice' && taskData.options && (_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83D\uDCCB Opcje odpowiedzi" }), _jsx("div", { className: "space-y-3", children: taskData.options.map((option, index) => (_jsx("div", { className: `p-3 rounded-lg border-l-4 ${option === taskData.correct_answer
                                                ? 'bg-success/10 border-success'
                                                : 'bg-base-200 border-base-300'}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { children: [_jsxs("span", { className: "font-semibold mr-2", children: [String.fromCharCode(65 + index), "."] }), option] }), option === taskData.correct_answer && (_jsx("span", { className: "badge badge-success badge-sm", children: "\u2713 Poprawna" }))] }) }, index))) })] }) })), taskData.type !== 'multiple_choice' && (_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\u2705 Poprawna odpowied\u017A" }), _jsx("div", { className: "bg-success/10 border-l-4 border-success p-4 rounded-lg", children: _jsx("span", { className: "font-medium", children: taskData.type === 'true_false'
                                                ? (taskData.correct_answer === 'true' ? '✅ Prawda' : '❌ Fałsz')
                                                : taskData.correct_answer }) })] }) })), taskData.explanation && (_jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h2", { className: "card-title text-lg mb-4", children: "\uD83D\uDCA1 Wyja\u015Bnienie" }), _jsx("div", { className: "bg-info/10 border-l-4 border-info p-4 rounded-lg", children: taskData.explanation })] }) })), _jsx("div", { className: "card bg-base-100 shadow-sm", children: _jsx("div", { className: "card-body", children: _jsx("div", { className: "card-actions", children: _jsx("button", { onClick: () => navigate(`/teacher/lessons/${lessonId}`), className: "btn btn-ghost", children: "\u2190 Powr\u00F3t do lekcji" }) }) }) })] })] }) }));
}
