// src/pages/auth/ui.StudentWelcome.tsx - DEDYKOWANY EKRAN DLA STUDENTÓW
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const routeConfig = {
  path: "/auth/student-welcome",
  title: "Student welcome"
};


export default function StudentWelcome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const studentFeatures = [
    { icon: '📚', title: 'Kursy', desc: 'Przeglądaj dostępne kursy', path: '/student/courses' },
    { icon: '✏️', title: 'Zadania', desc: 'Rozwiązuj ćwiczenia', path: '/student/exercises' },
    { icon: '📊', title: 'Postępy', desc: 'Śledź swoje wyniki', path: '/student/progress' },
    { icon: '🏆', title: 'Osiągnięcia', desc: 'Zdobywaj odznaki', path: '/student/achievements' }
  ];

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-8">
            <div className="text-6xl text-primary mb-4">🎓</div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Panel Studenta
            </h1>
            <p className="text-base-content/70">
              Witaj {user?.username}! Wybierz, co chcesz robić:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {studentFeatures.map((feature, index) => (
              <div 
                key={index}
                className="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors"
                onClick={() => navigate(feature.path)}
              >
                <div className="card-body items-center text-center p-4">
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-base-content/70">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="btn btn-primary flex-1"
            >
              🏠 Główny panel
            </button>
            <button
              onClick={() => logout()}
              className="btn btn-ghost"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}