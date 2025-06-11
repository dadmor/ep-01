import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export const routeConfig = {
    path: "/auth/welcome",
    title: "Welcome"
};
export default function WelcomeUI() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    if (!user) {
        navigate('/auth/login');
        return null;
    }
    const handleContinue = () => {
        if (user.role === 'teacher') {
            navigate('/teacher/dashboard');
        }
        else {
            navigate('/student/dashboard');
        }
    };
    const getRoleIcon = () => {
        return user.role === 'teacher' ? '👨‍🏫' : '🎓';
    };
    const getRoleColor = () => {
        return user.role === 'teacher' ? 'text-secondary' : 'text-primary';
    };
    const getRoleDescription = () => {
        return user.role === 'teacher'
            ? 'Zarządzaj kursami, twórz materiały i śledź postępy swoich uczniów.'
            : 'Rozpocznij naukę, rozwiązuj zadania i rozwijaj swoje umiejętności.';
    };
    return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center p-4", children: _jsx("div", { className: "card w-full max-w-md bg-base-100 shadow-xl", children: _jsxs("div", { className: "card-body text-center", children: [_jsxs("div", { className: "mb-6", children: [_jsx("div", { className: `text-6xl ${getRoleColor()} mb-4`, children: getRoleIcon() }), _jsx("h1", { className: "text-3xl font-bold text-primary mb-2", children: "Witaj ponownie!" }), _jsxs("p", { className: "text-base-content/70", children: ["Zalogowa\u0142e\u015B si\u0119 jako ", _jsx("span", { className: `font-bold ${getRoleColor()}`, children: user.role === 'teacher' ? 'Nauczyciel' : 'Student' })] })] }), _jsxs("div", { className: "bg-base-200 rounded-lg p-4 mb-6", children: [_jsx("div", { className: "text-sm text-base-content/70 mb-2", children: "Twoje dane:" }), _jsx("div", { className: "font-medium", children: user.username || user.email }), _jsx("div", { className: "text-sm text-base-content/60", children: user.email })] }), _jsx("p", { className: "text-base-content/70 mb-6", children: getRoleDescription() }), _jsxs("div", { className: "space-y-3", children: [_jsx("button", { onClick: handleContinue, className: `btn ${user.role === 'teacher' ? 'btn-secondary' : 'btn-primary'} w-full`, children: user.role === 'teacher' ? '📚 Przejdź do panelu nauczyciela' : '🚀 Rozpocznij naukę' }), _jsx("button", { onClick: () => logout(), className: "btn btn-ghost btn-sm w-full", children: "Wyloguj si\u0119" })] })] }) }) }));
}
