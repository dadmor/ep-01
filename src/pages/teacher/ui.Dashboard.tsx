// src/pages/teacher/ui.Dashboard.tsx
import { useFetch } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { TeacherPageLayout } from '@/components/layout/TeacherPageLayout';

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
    <TeacherPageLayout showPadding={true} title="Uczniowie" subtitle="Lista uczniów">
        
        {/* Header Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body py-4">
            <h1 className="card-title text-2xl">
              <span className="text-primary">👩‍🏫</span>
              Panel nauczyciela
            </h1>
            <p className="text-base-content/70">Witaj {user?.username}!</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body py-6 text-center">
              <div className="text-3xl font-bold text-primary">{lessons?.length || 0}</div>
              <div className="text-sm opacity-70">Moje lekcje</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body py-6 text-center">
              <div className="text-3xl font-bold text-accent">{totalArticles}</div>
              <div className="text-sm opacity-70">Treści</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body py-6 text-center">
              <div className="text-3xl font-bold text-info">{totalQuizzes}</div>
              <div className="text-sm opacity-70">Quizy</div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body py-6 text-center">
              <div className="text-3xl font-bold text-secondary">{students?.length || 0}</div>
              <div className="text-sm opacity-70">Uczniowie</div>
            </div>
          </div>
        </div>

        {/* Main Content Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Quick Actions Card */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">📝 Szybkie akcje</h2>
              <div className="space-y-3">
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

          {/* My Lessons Card */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">📊 Moje lekcje</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {lessons?.slice(0, 6).map(lesson => (
                  <Link 
                    key={lesson.id} 
                    to={`/teacher/lessons/${lesson.id}`}
                    className="block p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                  >
                    <div className="font-medium text-sm">{lesson.title}</div>
                    <div className="text-xs opacity-70 flex gap-2 mt-1">
                      <span>{lesson.subject}</span>
                      <span>•</span>
                      <span>{lesson.grade}</span>
                    </div>
                  </Link>
                ))}
                {lessons?.length === 0 && (
                  <div className="text-center py-8 text-base-content/50">
                    <p className="mb-2">Brak lekcji</p>
                    <Link to="/teacher/lessons/create" className="link link-primary text-sm">
                      Utwórz pierwszą lekcję
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Results Card */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">🎯 Ostatnie wyniki</h2>
              
              {avgScore > 0 && (
                <div className="card bg-base-200 shadow-sm mb-4">
                  <div className="card-body py-3 text-center">
                    <div className="text-2xl font-bold text-success">{avgScore}%</div>
                    <div className="text-xs opacity-70">Średni wynik</div>
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {recentProgress?.slice(0, 5).map(progress => {
                  const lesson = lessons?.find(l => l.id === progress.lesson_id);
                  return (
                    <div key={`${progress.user_id}-${progress.lesson_id}`} className="p-3 bg-base-200 rounded-lg">
                      <div className="font-medium text-sm">{lesson?.title || 'Nieznana lekcja'}</div>
                      <div className="text-xs opacity-70 flex justify-between mt-1">
                        <span>Wynik: {progress.score}%</span>
                        <span>{progress.correct_tasks}/{progress.total_tasks}</span>
                      </div>
                    </div>
                  );
                })}
                {(!recentProgress || recentProgress.length === 0) && (
                  <div className="text-center py-8 text-base-content/50">
                    <p className="text-sm">Brak aktywności uczniów</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">📈 Podsumowanie</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </TeacherPageLayout>
  );
}