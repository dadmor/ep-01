// src/pages/auth/ui.TeacherWelcome.tsx - POPRAWIONA KONFIGURACJA
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const routeConfig = {
  path: "/auth/teacher-welcome", // ✅ POPRAWIONE: teacher-welcome zamiast student-welcome
  title: "Teacher welcome"
};

export default function TeacherWelcome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const teacherFeatures = [
    { icon: '📖', title: 'Kursy', desc: 'Zarządzaj swoimi kursami', path: '/teacher/courses' },
    { icon: '👥', title: 'Studenci', desc: 'Przeglądaj uczniów', path: '/teacher/students' },
    { icon: '📝', title: 'Zadania', desc: 'Twórz ćwiczenia', path: '/teacher/exercises' },
    { icon: '📈', title: 'Analityka', desc: 'Statystyki i raporty', path: '/teacher/analytics' }
  ];

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-8">
            <div className="text-6xl text-secondary mb-4">👨‍🏫</div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Panel Nauczyciela
            </h1>
            <p className="text-base-content/70">
              Witaj {user?.username}! Wybierz, co chcesz robić:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {teacherFeatures.map((feature, index) => (
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
              onClick={() => navigate('/teacher/dashboard')}
              className="btn btn-secondary flex-1"
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