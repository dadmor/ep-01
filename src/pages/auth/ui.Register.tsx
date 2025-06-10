// src/pages/auth/Register.ui.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInsert } from '../api/hooks';

export const routeConfig = {
  path: "/auth/register",
  title: "Register"
};

// Typ dla formularza (z confirmPassword)
interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

// Typ dla API (bez confirmPassword)
interface RegisterApiData {
  email: string;
  username: string;
  password: string;
}

export default function RegisterUI() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const mutation = useInsert<RegisterApiData>('register', 'users');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordMatch) return;
    const { confirmPassword, ...apiData } = formData;
    mutation.mutate(apiData);
  };

  const handleTestData = () => {
    const mock: RegisterFormData = {
      email: 'new@example.com',
      username: 'newuser',
      password: 'password123',
      confirmPassword: 'password123'
    };
    setFormData(mock);
    const { confirmPassword, ...apiData } = mock;
    mutation.mutate(apiData);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Rejestracja</h1>
            <p className="text-base-content/70 mt-2">
              Utwórz nowe konto
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
                placeholder="Wprowadź nazwę użytkownika"
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
                placeholder="Potwierdź hasło"
                className={`input input-bordered w-full ${!passwordMatch && formData.confirmPassword ? 'input-error' : ''}`}
                required
              />
              {!passwordMatch && formData.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">Hasła nie pasują</span>
                </label>
              )}
            </div>

            {mutation.error && (
              <div className="alert alert-error">
                <span>{mutation.error.message}</span>
              </div>
            )}

            {mutation.data && (
              <div className="alert alert-success">
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
            <p className="text-base-content/70 mt-2">
              <Link to="/auth/register?agentMode=true" className="link link-secondary text-sm">
                Tryb agenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}