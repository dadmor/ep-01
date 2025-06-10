// src/pages/student/ui.Dashboard.tsx
import { useFetch } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';

export const routeConfig = { path: "/student/dashboard", title: "Student Dashboard" };

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: lessons } = useFetch('student-lessons', 'lessons');
  const { data: progress } = useFetch('student-progress', 'progress');

  return (
    <div className="p-4 space-y-4">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h1 className="text-2xl font-bold">👋 Cześć {user?.username}!</h1>
          <div className="stats stats-vertical lg:stats-horizontal">
            <div className="stat">
              <div className="stat-title">XP</div>
              <div className="stat-value text-primary">{user?.xp || 0}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Poziom</div>
              <div className="stat-value text-secondary">{user?.level || 1}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Seria</div>
              <div className="stat-value text-accent">{user?.streak || 0}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">📚 Dostępne lekcje</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {lessons?.map(lesson => (
                <div key={lesson.id} className="p-3 bg-base-200 rounded">
                  <div className="font-medium">{lesson.title}</div>
                  <div className="text-sm opacity-70">{lesson.subject}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">📊 Ostatnie wyniki</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {progress?.map(p => (
                <div key={p.id} className="flex justify-between p-2 bg-base-200 rounded">
                  <span className="text-sm">Wynik</span>
                  <span className="font-bold">{p.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
