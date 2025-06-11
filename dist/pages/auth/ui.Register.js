import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/auth/ui.Register.tsx - ROZSZERZONA WERSJA Z WYBOREM ROLI
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
export const routeConfig = {
    path: "/auth/register",
    title: "Register"
};
export default function RegisterUI() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'student'
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { register, loading } = useAuth();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === 'password' || name === 'confirmPassword') {
            const pass = name === 'password' ? value : formData.password;
            const conf = name === 'confirmPassword' ? value : formData.confirmPassword;
            setPasswordMatch(pass === conf);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatch)
            return;
        setError(null);
        setSuccess(false);
        try {
            await register(formData.email, formData.password, formData.username, formData.role);
            setSuccess(true);
        }
        catch (err) {
            setError(err);
        }
    };
    const handleTestData = async (role) => {
        const mock = {
            email: role === 'student' ? 'student@example.com' : 'teacher@example.com',
            username: role === 'student' ? 'teststudent' : 'testteacher',
            password: 'password123',
            confirmPassword: 'password123',
            role: role
        };
        setFormData(mock);
        setError(null);
        setSuccess(false);
        try {
            await register(mock.email, mock.password, mock.username, mock.role);
            setSuccess(true);
        }
        catch (err) {
            setError(err);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center p-4", children: _jsx("div", { className: "card w-full max-w-md bg-base-100 shadow-xl", children: _jsxs("div", { className: "card-body", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h1", { className: "text-3xl font-bold text-primary", children: "Rejestracja" }), _jsx("p", { className: "text-base-content/70 mt-2", children: "Utw\u00F3rz nowe konto" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text font-medium", children: "Email" }) }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, placeholder: "Wprowad\u017A sw\u00F3j email", className: "input input-bordered w-full", required: true })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text font-medium", children: "Nazwa u\u017Cytkownika" }) }), _jsx("input", { type: "text", name: "username", value: formData.username, onChange: handleInputChange, placeholder: "Wprowad\u017A nazw\u0119 u\u017Cytkownika", className: "input input-bordered w-full", required: true })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text font-medium", children: "Rola" }) }), _jsxs("select", { name: "role", value: formData.role, onChange: handleInputChange, className: "select select-bordered w-full", required: true, children: [_jsx("option", { value: "student", children: "\uD83C\uDF93 Student" }), _jsx("option", { value: "teacher", children: "\uD83D\uDC68\u200D\uD83C\uDFEB Nauczyciel" })] })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text font-medium", children: "Has\u0142o" }) }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleInputChange, placeholder: "Wprowad\u017A has\u0142o", className: "input input-bordered w-full", required: true })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text font-medium", children: "Potwierd\u017A has\u0142o" }) }), _jsx("input", { type: "password", name: "confirmPassword", value: formData.confirmPassword, onChange: handleInputChange, placeholder: "Potwierd\u017A has\u0142o", className: `input input-bordered w-full ${!passwordMatch && formData.confirmPassword ? 'input-error' : ''}`, required: true }), !passwordMatch && formData.confirmPassword && (_jsx("label", { className: "label", children: _jsx("span", { className: "label-text-alt text-error", children: "Has\u0142a nie pasuj\u0105" }) }))] }), error && (_jsx("div", { className: "alert alert-error", children: _jsx("span", { children: error.message }) })), success && (_jsx("div", { className: "alert alert-success", children: _jsx("span", { children: "Rejestracja udana! Sprawd\u017A email w celu potwierdzenia konta." }) })), _jsx("div", { className: "form-control mt-6", children: _jsx("button", { type: "submit", className: `btn btn-primary w-full ${loading ? 'loading' : ''}`, disabled: loading || !passwordMatch, children: loading ? 'Rejestrowanie...' : 'Zarejestruj się' }) })] }), _jsx("div", { className: "divider", children: "LUB" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => handleTestData('student'), className: "btn btn-outline btn-info flex-1", disabled: loading, children: "\uD83C\uDF93 Test Student" }), _jsx("button", { onClick: () => handleTestData('teacher'), className: "btn btn-outline btn-secondary flex-1", disabled: loading, children: "\uD83D\uDC68\u200D\uD83C\uDFEB Test Teacher" })] }), _jsxs("div", { className: "text-center mt-4", children: [_jsxs("p", { className: "text-base-content/70", children: ["Masz ju\u017C konto?", ' ', _jsx(Link, { to: "/auth/login", className: "link link-primary font-medium", children: "Zaloguj si\u0119" })] }), _jsx("p", { className: "text-base-content/70 mt-2", children: _jsx(Link, { to: "/auth/register?agentMode=true", className: "link link-secondary text-sm", children: "Tryb agenta" }) })] })] }) }) }));
}
