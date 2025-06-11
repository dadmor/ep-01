// src/pages/auth/ui.StudentWelcome.tsx - Z DAISYUI
import { PageHeader } from '@/components/ui_bloglike/base';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Book, PenTool, TrendingUp, Award, Home, LogOut } from 'lucide-react';

export const routeConfig = {
  path: "/auth/student-welcome",
  title: "Student welcome"
};

export default function StudentWelcome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const studentFeatures = [
    { 
      icon: <Book className="w-8 h-8 text-info" />, 
      title: 'Kursy', 
      desc: 'Przeglądaj dostępne kursy', 
      path: '/student/courses',
      bgColor: 'bg-info/10'
    },
    { 
      icon: <PenTool className="w-8 h-8 text-success" />, 
      title: 'Zadania', 
      desc: 'Rozwiązuj ćwiczenia', 
      path: '/student/exercises',
      bgColor: 'bg-success/10'
    },
    { 
      icon: <TrendingUp className="w-8 h-8 text-primary" />, 
      title: 'Postępy', 
      desc: 'Śledź swoje wyniki', 
      path: '/student/progress',
      bgColor: 'bg-primary/10'
    },
    { 
      icon: <Award className="w-8 h-8 text-warning" />, 
      title: 'Osiągnięcia', 
      desc: 'Zdobywaj odznaki', 
      path: '/student/achievements',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="min-h-screen bg-base-200/50">
      <PageHeader 
        title="Panel Studenta"
        subtitle={`Witaj ${user?.username}! Wybierz, co chcesz robić dzisiaj`}
      />

      <div className="container mx-auto px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Welcome card with icon */}
          <div className="card bg-base-100 shadow-sm p-12 mb-12">
            <div className="card-body items-center text-center p-0">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-3xl flex items-center justify-center mb-6">
                <div className="text-4xl">🎓</div>
              </div>
              <h2 className="card-title text-3xl font-serif tracking-tight mb-4">
                Twój Portal Edukacyjny
              </h2>
              <p className="text-base-content/70 text-lg leading-relaxed max-w-md">
                Rozwijaj swoje umiejętności w przyjaznym środowisku nauki
              </p>
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {studentFeatures.map((feature, index) => (
              <div 
                key={index}
                className="card bg-base-100 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200"
                onClick={() => navigate(feature.path)}
              >
                <div className="card-body p-8">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="card-title text-xl font-serif tracking-tight mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-base-content/70 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/student/dashboard')}
              className="btn btn-primary btn-lg gap-3"
            >
              <Home className="w-5 h-5" />
              Główny panel
            </button>
            <button
              onClick={() => logout()}
              className="btn btn-ghost btn-lg gap-3"
            >
              <LogOut className="w-5 h-5" />
              Wyloguj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}