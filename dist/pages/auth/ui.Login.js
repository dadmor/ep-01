import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/auth/ui.Login.tsx - POPRAWIONA WERSJA Z PRZEKIEROWANIEM
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
export const routeConfig = {
    path: "/auth/login",
    title: "Login",
};
export default function LoginUI() {
    const navigate = useNavigate();
    const { user } = useAuth(); // Dodaj useAuth hook
    const { formData, handleInputChange, handleSubmit, isLoading, error, data } = useLogin();
    // Obsługa przekierowania po udanym logowaniu
    useEffect(() => {
        if (user) {
            console.log("✅ UŻYTKOWNIK ZALOGOWANY, PRZEKIEROWANIE:", user);
            // Przekieruj do odpowiedniego panelu na podstawie roli
            if (user.role === "teacher") {
                navigate("/auth/teacher-welcome");
            }
            else {
                navigate("/auth/student-welcome");
            }
        }
    }, [user, navigate]);
    return (_jsx("div", { className: "min-h-screen bg-base-200 flex items-center justify-center p-4", children: _jsx("div", { className: "card w-full max-w-md bg-base-100 shadow-xl", children: _jsxs("div", { className: "card-body", children: [_jsx("img", { src: "/assets/smart-edi-play-logo.svg", alt: "Smart EDI Play Logo", className: "w-36 mx-auto mt-4 mb-2" }), _jsx("div", { className: "divider" }), _jsxs("div", { className: "text-center mb-6", children: [_jsx("h1", { className: "text-3xl font-bold text-primary", children: "Logowanie" }), _jsx("p", { className: "text-base-content/70 mt-2", children: "Witaj ponownie! Zaloguj si\u0119 do swojego konta" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text font-medium", children: "Email" }) }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, placeholder: "Wprowad\u017A sw\u00F3j email", className: "input input-bordered w-full", required: true })] }), _jsxs("div", { className: "form-control", children: [_jsx("label", { className: "label", children: _jsx("span", { className: "label-text font-medium", children: "Has\u0142o" }) }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleInputChange, placeholder: "Wprowad\u017A swoje has\u0142o", className: "input input-bordered w-full", required: true })] }), error && (_jsx("div", { className: "alert alert-error", children: _jsx("span", { children: error.message }) })), data && (_jsx("div", { className: "alert alert-success", children: _jsx("span", { children: "Logowanie udane! Przekierowanie..." }) })), _jsx("div", { className: "form-control mt-6", children: _jsx("button", { type: "submit", className: `btn btn-primary w-full ${isLoading ? "loading" : ""}`, disabled: isLoading, children: isLoading ? "Logowanie..." : "Zaloguj się" }) })] }), _jsx("div", { className: "divider", children: "LUB" }), _jsxs("div", { className: "text-center mt-4", children: [_jsxs("p", { className: "text-base-content/70", children: ["Nie masz konta?", " ", _jsx(Link, { to: "/auth/register", className: "link link-primary font-medium", children: "Zarejestruj si\u0119" })] }), _jsx("p", { className: "text-base-content/70 mt-2", children: _jsx(Link, { to: "/auth/login?agentMode=true", className: "link link-secondary text-sm", children: "Tryb agenta" }) })] })] }) }) }));
}
