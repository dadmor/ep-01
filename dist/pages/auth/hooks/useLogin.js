// src/pages/auth/hooks/useLogin.ts - NAPRAWIONA WERSJA
import { useAuth } from '@/hooks';
import { useState } from 'react';
export function useLogin() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error)
            setError(null);
    };
    const performLogin = async (loginData) => {
        console.log("🚀 PERFORM LOGIN:", loginData);
        setIsLoading(true);
        setError(null);
        try {
            console.log("📞 WYWOŁUJĘ AUTH.LOGIN...");
            await login(loginData.email, loginData.password);
            console.log("✅ AUTH.LOGIN ZAKOŃCZONY");
            setIsSuccess(true);
        }
        catch (error) {
            console.error("❌ BŁĄD W PERFORM LOGIN:", error);
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📋 HANDLE SUBMIT:", formData);
        if (!formData.email || !formData.password) {
            setError(new Error('Email i hasło są wymagane'));
            return;
        }
        await performLogin(formData);
    };
    const loginWithTestData = async () => {
        console.log("🧪 TEST DATA LOGIN");
        const testData = {
            email: 'dadmor+admin1@gmail.com',
            password: 'dadmor+admin1@gmail.com'
        };
        setFormData(testData);
        await performLogin(testData);
    };
    const reset = () => {
        setIsLoading(false);
        setError(null);
        setIsSuccess(false);
        setFormData({ email: '', password: '' });
    };
    return {
        formData,
        handleInputChange,
        handleSubmit,
        loginWithTestData,
        reset,
        isLoading,
        error,
        isSuccess,
        data: isSuccess ? { success: true } : null
    };
}
