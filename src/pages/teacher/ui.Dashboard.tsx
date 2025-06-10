// src/pages/teacher/ui.Dashboard.tsx
import { useFetch } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export const routeConfig = { path: "/teacher/dashboard", title: "Teacher Dashboard" };

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { data: lessons } = useFetch('teacher-lessons', `lessons?author_id=eq.${user?.id}`);
  const { data: students } = useFetch('students', `users?role=eq.student`);
  const { data: allTasks } = useFetch('teacher-tasks', `tasks?lesson_id=in.(${lessons?.map(l => l.id).join(',') || 'null'})`);
  const { data: allArticles } = useFetch('teacher-articles', `articles?lesson_id=in.(${lessons?.map(l => l.id).join(',') || 'null'})`);
  const { data: recentProgress } = useFetch('recent-progress', `progress?lesson_id=in.(${lessons?.map(l => l.id).join(',') || 'null'})&order=completed_at.desc&limit=10`);

  const totalQuizzes = allTasks?.length || 0;
  const totalArticles = allArticles?.length || 0;
  const avgScore = recentProgress?.length ? 
    Math.round(recentProgress.reduce((sum, p) => sum + p.score, 0) / recentProgress.length) : 0;

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h1 className="text-2xl font-bold">👩‍🏫 Panel nauczyciela</h1>
          <p>Witaj {user?.username}!</p>
          
          <div className="stats stats-vertical lg:stats-horizontal">
            <div className="stat">
              <div className="stat-title">Moje lekcje</div>
              <div className="stat-value text-primary">{lessons?.length || 0}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Treści</div>
              <div className="stat-value text-accent">{totalArticles}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Quizy</div>
              <div className="stat-value text-info">{totalQuizzes}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Uczniowie</div>
              <div className="stat-value text-secondary">{students?.length || 0}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">📝 Szybkie akcje</h2>
            <div className="space-y-2">
              <Link to="/teacher/lessons/create" className="btn btn-primary w-full">
                ➕ Nowa lekcja
              </Link>
              <Link to="/teacher/lessons" className="btn btn-outline w-full">
                📚 Zarządzaj lekcjami
              </Link>
              <Link to="/teacher/students" className="btn btn-outline w-full">
                👥 Lista uczniów
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">📊 Moje lekcje</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {lessons?.slice(0, 6).map(lesson => (
                <Link 
                  key={lesson.id} 
                  to={`/teacher/lessons/${lesson.id}`}
                  className="block p-2 bg-base-200 rounded hover:bg-base-300 transition-colors"
                >
                  <div className="font-medium text-sm">{lesson.title}</div>
                  <div className="text-xs opacity-70 flex gap-2">
                    <span>{lesson.subject}</span>
                    <span>•</span>
                    <span>{lesson.grade}</span>
                  </div>
                </Link>
              ))}
              {lessons?.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <p>Brak lekcji</p>
                  <Link to="/teacher/lessons/create" className="link link-primary text-sm">
                    Utwórz pierwszą lekcję
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">🎯 Ostatnie wyniki</h2>
            {avgScore > 0 && (
              <div className="stat p-0 mb-4">
                <div className="stat-title text-sm">Średni wynik</div>
                <div className="stat-value text-lg">{avgScore}%</div>
              </div>
            )}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {recentProgress?.slice(0, 5).map(progress => {
                const lesson = lessons?.find(l => l.id === progress.lesson_id);
                return (
                  <div key={`${progress.user_id}-${progress.lesson_id}`} className="p-2 bg-base-200 rounded">
                    <div className="font-medium text-sm">{lesson?.title || 'Nieznana lekcja'}</div>
                    <div className="text-xs opacity-70 flex justify-between">
                      <span>Wynik: {progress.score}%</span>
                      <span>{progress.correct_tasks}/{progress.total_tasks}</span>
                    </div>
                  </div>
                );
              })}
              {(!recentProgress || recentProgress.length === 0) && (
                <div className="text-center py-4 text-gray-500">
                  <p className="text-sm">Brak aktywności uczniów</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sekcja podsumowania */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">📈 Podsumowanie</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{lessons?.length || 0}</div>
              <div className="text-sm opacity-70">Utworzonych lekcji</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{totalArticles}</div>
              <div className="text-sm opacity-70">Treści napisanych</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{totalQuizzes}</div>
              <div className="text-sm opacity-70">Quizów przygotowanych</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {recentProgress?.reduce((sum, p) => sum + p.attempts_count, 0) || 0}
              </div>
              <div className="text-sm opacity-70">Rozwiązań uczniów</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}