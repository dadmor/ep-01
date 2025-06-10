// src/hooks/useLogin.ts
import { useInsert } from '@/pages/api/hooks';
import { useState } from 'react';


interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  
  const mutation = useInsert<LoginData>('login', 'auth');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleTestData = () => {
    const mockLogin = { email: 'test@example.com', password: 'password' };
    setFormData(mockLogin);
    mutation.mutate(mockLogin);
  };

  const loginWithTestData = () => {
    const mockLogin = { email: 'test@example.com', password: 'password' };
    mutation.mutate(mockLogin);
  };

  return {
    formData,
    setFormData,
    mutation,
    handleInputChange,
    handleSubmit,
    handleTestData,
    loginWithTestData,
    // Wygodne skróty dla agentów
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    isSuccess: !!mutation.data
  };
}
