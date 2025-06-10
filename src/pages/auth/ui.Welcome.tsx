// src/pages/auth/ui.Welcome.tsx - NOWY EKRAN PO ZALOGOWANIU
import React from 'react';
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
    } else {
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

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <div className="mb-6">
            <div className={`text-6xl ${getRoleColor()} mb-4`}>
              {getRoleIcon()}
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Witaj ponownie!
            </h1>
            <p className="text-base-content/70">
              Zalogowałeś się jako <span className={`font-bold ${getRoleColor()}`}>
                {user.role === 'teacher' ? 'Nauczyciel' : 'Student'}
              </span>
            </p>
          </div>

          <div className="bg-base-200 rounded-lg p-4 mb-6">
            <div className="text-sm text-base-content/70 mb-2">Twoje dane:</div>
            <div className="font-medium">{user.username || user.email}</div>
            <div className="text-sm text-base-content/60">{user.email}</div>
          </div>

          <p className="text-base-content/70 mb-6">
            {getRoleDescription()}
          </p>

          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className={`btn ${user.role === 'teacher' ? 'btn-secondary' : 'btn-primary'} w-full`}
            >
              {user.role === 'teacher' ? '📚 Przejdź do panelu nauczyciela' : '🚀 Rozpocznij naukę'}
            </button>
            
            <button
              onClick={() => logout()}
              className="btn btn-ghost btn-sm w-full"
            >
              Wyloguj się
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}