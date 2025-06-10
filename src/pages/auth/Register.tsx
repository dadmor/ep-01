// src/pages/auth/Register.tsx
import React, { useState } from 'react';
import { useInsert } from '../api/hooks';
import { Link } from 'react-router-dom';

export const routeConfig = {
  path: "/auth/register",
  title: "Register"
};

interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [passwordMatch, setPasswordMatch] = useState(true);
  const mutation = useInsert<RegisterData>('register', 'users');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Sprawdź zgodność haseł
    if (name === 'confirmPassword' || name === 'password') {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordMatch(password === confirmPassword);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordMatch) {
      return;
    }

    // Usuń confirmPassword przed wysłaniem
    const { confirmPassword, ...dataToSend } = formData;
    mutation.mutate(dataToSend);
  };

  const handleTestData = () => {
    const mockRegister = { 
      email: 'new@example.com', 
      username: 'newuser', 
      password: 'password123' 
    };
    setFormData({
      ...mockRegister,
      confirmPassword: 'password123'
    });
    mutation.mutate(mockRegister);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Rejestracja</h1>
            <p className="text-base-content/70 mt-2">
              Stwórz nowe konto i dołącz do nas
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Wprowadź swój email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nazwa użytkownika</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Wybierz nazwę użytkownika"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Hasło</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Wprowadź hasło"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Potwierdź hasło</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Powtórz hasło"
                className={`input input-bordered w-full ${
                  !passwordMatch && formData.confirmPassword ? 'input-error' : ''
                }`}
                required
              />
              {!passwordMatch && formData.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Hasła nie są zgodne
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="cursor-pointer label justify-start gap-3">
                <input type="checkbox" className="checkbox checkbox-primary" required />
                <span className="label-text">
                  Akceptuję{' '}
                  <a href="#" className="link link-primary">
                    regulamin
                  </a>{' '}
                  i{' '}
                  <a href="#" className="link link-primary">
                    politykę prywatności
                  </a>
                </span>
              </label>
            </div>

            {mutation.error && (
              <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{mutation.error.message}</span>
              </div>
            )}

            {mutation.data && (
              <div className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Rejestracja udana!</span>
              </div>
            )}

            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary w-full ${mutation.isPending ? 'loading' : ''}`}
                disabled={mutation.isPending || !passwordMatch}
              >
                {mutation.isPending ? 'Rejestrowanie...' : 'Zarejestruj się'}
              </button>
            </div>
          </form>

          <div className="divider">LUB</div>

          <button 
            onClick={handleTestData}
            className="btn btn-outline btn-secondary w-full"
            disabled={mutation.isPending}
          >
            Użyj danych testowych
          </button>

          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Masz już konto?{' '}
              <Link to="/auth/login" className="link link-primary font-medium">
                Zaloguj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}